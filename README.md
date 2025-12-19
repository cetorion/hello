# AWS, Terraform, ECS, Go, React - Application Example Showcase


## The Application

### Simple Go/React application

Functionality:
- GET /helo - respond with "OK" and HTTP Responce code 200
- GET / - simple React frontend to showcase the code

The frontend simply pings URLs from a provided json list to test if they are alive 

### Application codebase showcasing Go and React

Points of interest:
- Embedding frontend React/JS code within Go static binary
  that serves backend and frontend form a single executable without any external dependencies
- Container is built as “scratch” wrapping the executable in OCI metadata only
  without an underlying OS or inner-container dependencies creating a very small image.

## The Infrastructure

Application deployment is done using AWS ECS with Fargate
Provided "diagram.png" shows the underlying infrastructure resources for this deployent
Terraform is used throughout to build the resources with IaC principles
Terraform state is managed by S3 bucket

### Resources

Terraform built resources:
- S3  - Terraform state management
- ECS - For scaling and flexible deployment
- ALB - Application load balancer
- ECR - Container registry
- VPC - Public facing subnet
- IAM, SGs - Provide various roles to run the application in a secure manner

## CI/CD

Deployment automation is done with GitHub Actions
Actions are triggered by "workflow_dispatch" event (manual trigger) for simplicity

The Actions:
- Create - creates the infrastructure with Terraform
- Destroy - destroys the infrustructure
- Build - builds application image and pushes it to the ECR registry
