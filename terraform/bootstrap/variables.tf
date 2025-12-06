variable "aws_region" {
  type    = string
  default = "ap-southeast-2"
}

variable "aws_profile" {
  type    = string
  default = "devine"
}

variable "bucket_prefix" {
  type    = string
  default = "terraform-state"
}

variable "dynamodb_table_name" {
  type    = string
  default = "terraform-locks"
}
