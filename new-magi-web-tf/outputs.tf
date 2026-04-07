###############################################################################
# terraform-webapp/outputs.tf
###############################################################################

output "webapp_alb_dns" {
  description = "Public DNS of the webapp ALB — access the app here"
  value       = aws_lb.webapp.dns_name
}

output "webapp_alb_arn" {
  description = "ARN of the webapp ALB"
  value       = aws_lb.webapp.arn
}

output "webapp_ecr_url" {
  description = "ECR repository URL for the webapp image"
  value       = aws_ecr_repository.webapp.repository_url
}

output "webapp_ecs_service_name" {
  description = "ECS service name (used by CodePipeline deploy stage)"
  value       = aws_ecs_service.webapp.name
}

output "webapp_task_definition_arn" {
  description = "Latest ECS task definition ARN"
  value       = aws_ecs_task_definition.webapp.arn
}

output "codepipeline_name" {
  description = "Name of the CodePipeline"
  value       = aws_codepipeline.webapp.name
}
