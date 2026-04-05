variable "aws_region"     { type = string, default = "ap-southeast-1" }
variable "app_name"       { type = string, default = "myapp" }
variable "environment"    { type = string, default = "dev" }
variable "tfstate_bucket" { type = string, default = "myapp-tfstate" }
variable "github_repo"    { type = string }
variable "github_branch"  { type = string, default = "main" }
variable "task_cpu"       { type = number, default = 256 }
variable "task_memory"    { type = number, default = 512 }
variable "desired_count"  { type = number, default = 2 }
variable "min_capacity"   { type = number, default = 1 }
variable "max_capacity"   { type = number, default = 10 }

variable "db_name"     { type = string, default = "appdb" }
variable "db_username" { type = string, default = "admin" }
