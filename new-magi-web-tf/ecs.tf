###############################################################################
# terraform-webapp/ecs.tf
# IAM roles, CloudWatch log group, ECS task definition and service.
###############################################################################

# ── CloudWatch Log Group ──────────────────────────────────────────────────────

resource "aws_cloudwatch_log_group" "webapp" {
  name              = "/ecs/${local.name_prefix}-webapp"
  retention_in_days = 30
  tags              = local.common_tags
}

# ── IAM — ECS Task Execution Role ─────────────────────────────────────────────

resource "aws_iam_role" "ecs_task_execution" {
  name = "${local.name_prefix}-webapp-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = local.common_tags
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution" {
  role       = aws_iam_role.ecs_task_execution.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

# Allow pulling from ECR and writing logs
resource "aws_iam_role_policy" "ecs_task_execution_extras" {
  name = "${local.name_prefix}-webapp-execution-extras"
  role = aws_iam_role.ecs_task_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ]
        Resource = "*"
      },
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "${aws_cloudwatch_log_group.webapp.arn}:*"
      }
    ]
  })
}

# ── IAM — ECS Task Role (runtime permissions) ─────────────────────────────────

resource "aws_iam_role" "ecs_task" {
  name = "${local.name_prefix}-webapp-task-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect    = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
      Action    = "sts:AssumeRole"
    }]
  })

  tags = local.common_tags
}

# ── ECS Task Definition ───────────────────────────────────────────────────────

resource "aws_ecs_task_definition" "webapp" {
  family                   = "${local.name_prefix}-webapp"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = var.webapp_cpu
  memory                   = var.webapp_memory
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([
    {
      name      = "webapp"
      image     = "${aws_ecr_repository.webapp.repository_url}:${var.webapp_image_tag}"
      essential = true

      portMappings = [
        {
          containerPort = var.webapp_container_port
          protocol      = "tcp"
        }
      ]

      environment = [
        { name = "NODE_ENV", value = var.environment },
        # The API gateway URL — webapp calls this at runtime
        { name = "VITE_API_BASE_URL", value = "http://${aws_lb.webapp.dns_name}/api" }
      ]

      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = aws_cloudwatch_log_group.webapp.name
          "awslogs-region"        = var.aws_region
          "awslogs-stream-prefix" = "ecs"
        }
      }

      healthCheck = {
        command     = ["CMD-SHELL", "curl -f http://localhost:${var.webapp_container_port}/ || exit 1"]
        interval    = 30
        timeout     = 5
        retries     = 3
        startPeriod = 60
      }
    }
  ])

  tags = local.common_tags

  # Prevent Terraform from reverting image tag after CodePipeline deploys a new one
  lifecycle {
    ignore_changes = [container_definitions]
  }
}

# ── ECS Service ───────────────────────────────────────────────────────────────

resource "aws_ecs_service" "webapp" {
  name            = "${local.name_prefix}-webapp-service"
  cluster         = local.ecs_cluster_arn
  task_definition = aws_ecs_task_definition.webapp.arn
  desired_count   = var.webapp_desired_count
  launch_type     = "FARGATE"

  # Allow CodePipeline to update the task definition without Terraform reverting it
  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }

  network_configuration {
    subnets          = local.private_subnet_ids
    security_groups  = [local.sg_webapp_tasks_id]
    assign_public_ip = false
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.webapp.arn
    container_name   = "webapp"
    container_port   = var.webapp_container_port
  }

  deployment_minimum_healthy_percent = 50
  deployment_maximum_percent         = 200

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  depends_on = [
    aws_lb_listener.http_forward,
    aws_iam_role_policy_attachment.ecs_task_execution
  ]

  tags = local.common_tags
}
