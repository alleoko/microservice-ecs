# Public ALB for webapp
resource "aws_lb" "webapp" {
  name               = "${var.app_name}-webapp-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.public_alb.id]
  subnets            = module.vpc.public_subnets
  tags               = local.common_tags
}

resource "aws_lb_target_group" "webapp" {
  name        = "${var.app_name}-webapp-tg"
  port        = var.webapp_port
  protocol    = "HTTP"
  vpc_id      = module.vpc.vpc_id
  target_type = "ip"
  health_check { 
    path = "/health"
    matcher = "200"
    interval = 30 
    timeout = 5 
    healthy_threshold = 2 
    unhealthy_threshold = 3 
    }
  tags = local.common_tags
}

resource "aws_lb_listener" "webapp" {
  load_balancer_arn = aws_lb.webapp.arn
  port              = 80
  protocol          = "HTTP"
  default_action { 
    type = "forward" 
    target_group_arn = aws_lb_target_group.webapp.arn 
    }
}
