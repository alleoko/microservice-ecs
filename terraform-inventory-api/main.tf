###############################################################################
# terraform-inventory-api/main.tf
# Reads shared infra state from terraform-infra.
# Apply terraform-infra FIRST.
###############################################################################

terraform {
  required_version = ">= 1.6"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 5.0" }
  }
  backend "s3" {
    bucket = "myapp-tfstate"
    key    = "inventory-api/terraform.tfstate"
    region = "ap-southeast-1"
  }
}

provider "aws" { region = var.aws_region }

data "aws_caller_identity" "current" {}

data "terraform_remote_state" "infra" {
  backend = "s3"
  config = {
    bucket = var.tfstate_bucket
    key    = "infra/terraform.tfstate"
    region = var.aws_region
  }
}

locals {
  common_tags = {
    Project     = var.app_name
    Environment = var.environment
    ManagedBy   = "Terraform"
    Service     = "inventory-api"
  }
}
