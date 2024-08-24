variable "region" {
  default = "us-east-1"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}

variable "public_subnet_cidrs" {
  type    = list(string)
  default = ["10.0.1.0/24", "10.0.2.0/24"]
}

variable "public_subnet_cidr_ec2" {
  default = "10.0.3.0/24"
}

variable "private_subnet_cidrs_rds" {
  type    = list(string)
  default = ["10.0.4.0/24", "10.0.5.0/24"]
}

variable "rds_secret_name" {
  description = "Name of the Secrets Manager secret for RDS credentials"
  default     = "rdsSecret"
}

variable "rds_db_name" {
  default = "mydatabase"
}

variable "ami_id" {
  default = "ami-08a0d1e16fc3f61ea"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "rds_type" {
  default = "db.t3.medium"
}