# Internal ALBs – one per API service
locals {
  api_services = ["users", "patient", "facility", "guarantor", "inventory", "reports"]
}

resource "aws_lb" "api" {
  for_each           = toset(local.api_services)
  name               = "${var.app_name}-${each.key}-alb"
  internal           = true
  load_balancer_type = "application"
  security_groups    = [aws_security_group.internal_alb.id]
  subnets            = module.vpc.private_subnets
  tags               = local.common_tags
}

resource "aws_lb_target_group" "api" {
  for_each    = toset(local.api_services)
  name        = "${var.app_name}-${each.key}-tg"
  port        = var.api_port
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

resource "aws_lb_listener" "api" {
  for_each          = toset(local.api_services)
  load_balancer_arn = aws_lb.api[each.key].arn
  port              = 80
  protocol          = "HTTP"
  default_action { 
    type = "forward" 
    target_group_arn = aws_lb_target_group.api[each.key].arn 
    }
}
