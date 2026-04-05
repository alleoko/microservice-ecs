# Public ALB SG
resource "aws_security_group" "public_alb" {
  name        = "${var.app_name}-public-alb-sg"
  description = "Public ALB – allow HTTP/HTTPS from internet"
  vpc_id      = module.vpc.vpc_id

  ingress { from_port = 80,  to_port = 80,  protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }
  ingress { from_port = 443, to_port = 443, protocol = "tcp", cidr_blocks = ["0.0.0.0/0"] }
  egress  { from_port = 0,   to_port = 0,   protocol = "-1",  cidr_blocks = ["0.0.0.0/0"] }

  tags = merge(local.common_tags, { Name = "${var.app_name}-public-alb-sg" })
}

# Webapp tasks SG
resource "aws_security_group" "webapp_tasks" {
  name        = "${var.app_name}-webapp-tasks-sg"
  description = "Webapp ECS tasks – allow from public ALB"
  vpc_id      = module.vpc.vpc_id

  ingress { from_port = var.webapp_port, to_port = var.webapp_port, protocol = "tcp", security_groups = [aws_security_group.public_alb.id] }
  egress  { from_port = 0, to_port = 0, protocol = "-1", cidr_blocks = ["0.0.0.0/0"] }

  tags = merge(local.common_tags, { Name = "${var.app_name}-webapp-tasks-sg" })
}

# Internal ALB SG
resource "aws_security_group" "internal_alb" {
  name        = "${var.app_name}-internal-alb-sg"
  description = "Internal ALBs – allow from webapp tasks"
  vpc_id      = module.vpc.vpc_id

  ingress { from_port = 80, to_port = 80, protocol = "tcp", security_groups = [aws_security_group.webapp_tasks.id] }
  egress  { from_port = 0,  to_port = 0,  protocol = "-1",  cidr_blocks = ["0.0.0.0/0"] }

  tags = merge(local.common_tags, { Name = "${var.app_name}-internal-alb-sg" })
}

# API tasks SG
resource "aws_security_group" "api_tasks" {
  name        = "${var.app_name}-api-tasks-sg"
  description = "API ECS tasks – allow from internal ALBs"
  vpc_id      = module.vpc.vpc_id

  ingress { from_port = var.api_port, to_port = var.api_port, protocol = "tcp", security_groups = [aws_security_group.internal_alb.id] }
  egress  { from_port = 0, to_port = 0, protocol = "-1", cidr_blocks = ["0.0.0.0/0"] }

  tags = merge(local.common_tags, { Name = "${var.app_name}-api-tasks-sg" })
}

# RDS SG
resource "aws_security_group" "rds" {
  name        = "${var.app_name}-rds-sg"
  description = "RDS – allow MySQL from API tasks"
  vpc_id      = module.vpc.vpc_id

  ingress { from_port = 3306, to_port = 3306, protocol = "tcp", security_groups = [aws_security_group.api_tasks.id] }
  egress  { from_port = 0,    to_port = 0,    protocol = "-1",  cidr_blocks = ["0.0.0.0/0"] }

  tags = merge(local.common_tags, { Name = "${var.app_name}-rds-sg" })
}
