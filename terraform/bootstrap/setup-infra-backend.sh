#!/bin/bash

BUCKET=$(terraform output -raw bucket_name)
TABLE=$(terraform output -raw dynamodb_table_name)
REGION=$(terraform output -raw aws_region)

cat >../infra/backend.hcl <<EOF
bucket         = "${BUCKET}"
key            = "env/test/terraform.tfstate"
region         = "${REGION}"
dynamodb_table = "${TABLE}"
encrypt        = true
EOF

#cd infra
#terraform init -backend-config=infra/backend.hcl
