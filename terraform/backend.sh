#!/bin/bash

BUCKET=$(cd bootstrap && terraform output -raw bucket_name)
TABLE=$(cd bootstrap && terraform output -raw dynamodb_table_name)
REGION=$(cd bootstrap && terraform output -raw aws_region)

cat >infra/backend.hcl <<EOF
bucket         = "${BUCKET}"
key            = "env/test/terraform.tfstate"
region         = "${REGION}"
dynamodb_table = "${TABLE}"
encrypt        = true
EOF

# terraform init -backend-config=infra/backend.hcl
