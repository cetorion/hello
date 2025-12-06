resource "aws_ecr_repository" "app" {
  name                 = "go-app"
  force_delete         = true
  image_tag_mutability = "MUTABLE"
}
