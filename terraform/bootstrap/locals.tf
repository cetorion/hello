locals {
  bucket_name = "${var.bucket_prefix}-${random_id.suffix.hex}"
}
