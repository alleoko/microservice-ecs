###############################################################################
# terraform-webapp/variables.tf
###############################################################################

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "app_name" {
  description = "Application name prefix"
  type        = string
  default     = "magi-app"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "stg"
}

variable "tfstate_bucket" {
  description = "S3 bucket for Terraform remote state — must match backend block"
  type        = string
  default     = "magi-app-stg"
}

# ── ECS ───────────────────────────────────────────────────────────────────────

variable "webapp_image_tag" {
  description = "Docker image tag to deploy (overridden by CodePipeline)"
  type        = string
  default     = "latest"
}

variable "webapp_cpu" {
  description = "ECS task CPU units"
  type        = number
  default     = 256
}

variable "webapp_memory" {
  description = "ECS task memory (MB)"
  type        = number
  default     = 512
}

variable "webapp_desired_count" {
  description = "Desired number of ECS task replicas"
  type        = number
  default     = 1
}

variable "webapp_container_port" {
  description = "Port the Nginx container listens on"
  type        = number
  default     = 80
}

# ── ALB ───────────────────────────────────────────────────────────────────────

variable "health_check_path" {
  description = "ALB health check path"
  type        = string
  default     = "/"
}

# ── CodePipeline ──────────────────────────────────────────────────────────────

variable "github_repo" {
  description = "GitHub repository name (owner/repo)"
  type        = string
  default     = "alleoko/microservice-ecs"
}

variable "github_branch" {
  description = "Branch that triggers the pipeline"
  type        = string
  default     = "main"
}

variable "github_connection_arn" {
  description = "AWS CodeStar connection ARN for GitHub"
  type        = string
  # Create once via: AWS Console > CodePipeline > Settings > Connections
}
