# AWS, Terraform, ECS, Go, React - Application Example Showcase


## The Application

### Simple Go/React application

Functionality:
- GET /helo - respond with "OK" and HTTP Responce code 200
- GET / - simple React frontend to showcase the code

The frontend simply pings URLs from a provided json list to test if they are alive 

### Application codebase showcasing Go and React

Points of interest:
- Embedding  frontend React/JS code within Go executable to create a compact, compiled, static binary
  that serves both, the backend server and the frontend UI form a single executable without any external dependencies
- Container build is done as a  “scratch” container which wraps the executable only in OCI metadata
  without any underlying OS or inner-container dependencies. This creates a very tight, small and cost effective image.


## The Infrastructure

Application deployment is done using AWS ECS with Fargate
Provided "diagram.png" shows the underlying infrastructure resources for this deployent

Terraform is used throughout to build the resources with IaC principles

### Resources

The resources built by the Terraform:
- S3  - Terraform state management
- ECS - For scaling and flexxible deployment
- ALB - Application load balancer
- ECR - Container registry
- VPC - Public facing subnet
- IAM, SGs - Provide various roles to run the application in a secure manner


## Costs

Monthly cost estimate for handling 1,000,000 HTTP requests (ap-southeast-2)
Infra: 1 Fargate task, ALB, ECR, CloudWatch, S3 backend

Assumptions:
- App: 1 Fargate task (256 CPU / 0.5 GB) running 24/7.
- ALB internet-facing on port 80.
- Average response size: 100 KB per request.
- Monthly requests: 1,000,000.
- No heavy bursts
- Logs: request metadata + short body → ~0.5 KB per request (0.5 MB per 1k requests)
- ECR storage small (5 GB). S3/DynamoDB minimal.

### Estimated costs (monthly)

- Fargate compute & memory (1 task, 256 vCPU units / 0.25 vCPU, 0.5 GB RAM, 24/7)
  Approx: AUD 16 – 22

- ALB (Application Load Balancer)
  Fixed hourly charge: ~AUD 16 (≈ AUD 0.022/hr × 720h)
  LCU charges: LCUs depend on new connections, active connections, processed bytes, and rule evaluations.
  For 1M requests of ~100 KB = ~100 GB outbound data → data-processing portion of LCUs and data transfer costs matter.
  Estimate LCUs: moderate traffic → ~50–150 AUD equivalent? (LCU pricing is complex; for moderate request rates estimate)
  Practical conservative ALB total estimate: AUD 25 – 60

- Data transfer (egress)
  1,000,000 requests × 100 KB = ~100,000,000 KB ≈ 95.4 GB ~ 95–100 GB
  First GB free; remaining ≈ 95 GB × ~AUD 0.12/GB ≈ AUD 11–12

- CloudWatch Logs
  Ingestion: 1M × 0.5 KB ≈ 500 MB (~0.5 GB) ingestion → negligible
  Storage & retrieval small: estimate AUD 1 – 3

- ECR storage
  5 GB stored: ~AUD 0.10 – 0.50

- S3 (Terraform state)
  Minimal: ~AUD 0.10 – 1

- Misc / buffer (IAM, NAT, other small resources)
  ~AUD 1 – 3

Monthly total (rounded)
- Low estimate: AUD 55
- High estimate: AUD 100

Notes:
The biggest variables are ALB LCU costs and data transfer.
If average response size is larger (e.g., 500 KB), egress and ALB costs rise proportionally.
Scaling to multiple tasks for concurrency, Fargate cost scales by tasks × runtime.
Enabling HTTPS (ACM + TLS) there is no ACM charge for public certs, but ALB behavior and LCUs remain same.
