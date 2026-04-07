###############################################################################
# terraform-webapp/main.tf
# Deploys the magi-web React frontend on ECS Fargate.
# Reads shared infra state from terraform-infra.
# Apply terraform-infra FIRST.
###############################################################################

terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket         = "magi-app-stg"          # must match var.tfstate_bucket
    key            = "webapp/terraform.tfstate"
    region         = "ap-southeast-1"        # must match var.aws_region default
    encrypt        = true
    dynamodb_table = "magi-terraform-locks"
  }
}

provider "aws" { region = var.aws_region }

data "aws_caller_identity" "current" {}

###############################################################################
# Remote state — reads outputs from terraform-infra
###############################################################################
data "terraform_remote_state" "infra" {
  backend = "s3"
  config = {
    bucket = var.tfstate_bucket
    key    = "infra/terraform.tfstate"
    region = var.aws_region
  }
}

###############################################################################
# Locals
###############################################################################
locals {
  name_prefix = "${var.app_name}-${var.environment}"

  # Pull all needed values from infra remote state
  vpc_id             = data.terraform_remote_state.infra.outputs.vpc_id
  private_subnet_ids = data.terraform_remote_state.infra.outputs.private_subnet_ids
  public_subnet_ids  = data.terraform_remote_state.infra.outputs.public_subnet_ids
  ecs_cluster_name   = data.terraform_remote_state.infra.outputs.ecs_cluster_name
  ecs_cluster_arn    = data.terraform_remote_state.infra.outputs.ecs_cluster_arn
  sg_webapp_tasks_id = data.terraform_remote_state.infra.outputs.sg_webapp_tasks_id
  sg_public_alb_id   = data.terraform_remote_state.infra.outputs.sg_public_alb_id
  artifacts_bucket   = data.terraform_remote_state.infra.outputs.artifacts_bucket

  common_tags = {
    Project     = var.app_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Service     = "webapp"
  }
}
