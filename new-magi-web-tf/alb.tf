###############################################################################
# terraform-webapp/alb.tf
# Public-facing ALB for the React frontend.
###############################################################################

# ── Application Load Balancer ─────────────────────────────────────────────────

resource "aws_lb" "webapp" {
  name               = "${local.name_prefix}-webapp-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [local.sg_public_alb_id]
  subnets            = local.public_subnet_ids

  enable_deletion_protection = false

  tags = local.common_tags
}

# ── Target Group ──────────────────────────────────────────────────────────────

resource "aws_lb_target_group" "webapp" {
  name        = "${local.name_prefix}-webapp-tg"
  port        = var.webapp_container_port
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip" # required for ECS Fargate

  health_check {
    enabled             = true
    path                = var.health_check_path
    protocol            = "HTTP"
    matcher             = "200-299"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 2
    unhealthy_threshold = 3
  }

  tags = local.common_tags

  lifecycle {
    create_before_destroy = true
  }
}

# ── Listeners ─────────────────────────────────────────────────────────────────

# HTTP → redirect to HTTPS
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.webapp.arn
  port              = 80
  protocol          = "HTTP"

  default_action {
    type = "redirect"
    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# HTTPS → forward to webapp target group
# Uncomment and add certificate_arn once ACM cert is ready
# resource "aws_lb_listener" "https" {
#   load_balancer_arn = aws_lb.webapp.arn
#   port              = 443
#   protocol          = "HTTPS"
#   ssl_policy        = "ELBSecurityPolicy-TLS13-1-2-2021-06"
#   certificate_arn   = var.acm_certificate_arn
#
#   default_action {
#     type             = "forward"
#     target_group_arn = aws_lb_target_group.webapp.arn
#   }
# }

# HTTP forward (use while ACM cert is pending)
resource "aws_lb_listener" "http_forward" {
  load_balancer_arn = aws_lb.webapp.arn
  port              = 8080
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.webapp.arn
  }
}
