data "aws_secretsmanager_secret" "rds" {
  name = var.rds_secret_name
}

data "aws_secretsmanager_secret_version" "rds" {
  secret_id = data.aws_secretsmanager_secret.rds.id
}

resource "aws_db_instance" "mysql" {
  identifier              = "mydb"
  allocated_storage       = 20
  engine                  = "mysql"
  engine_version          = "5.7"
  instance_class          = var.rds_type
  db_name                 = var.rds_db_name
  username                = jsondecode(data.aws_secretsmanager_secret_version.rds.secret_string)["username"]
  password                = jsondecode(data.aws_secretsmanager_secret_version.rds.secret_string)["password"]
  parameter_group_name    = "default.mysql5.7"
  skip_final_snapshot     = true
  publicly_accessible     = false
  vpc_security_group_ids  = [aws_security_group.rds_sg.id]
  db_subnet_group_name    = aws_db_subnet_group.main.name

  tags = {
    Name = "anime-rds"
  }
}

resource "aws_db_subnet_group" "main" {
  name       = "main"
  subnet_ids = [aws_subnet.private_rds_a.id, aws_subnet.private_rds_b.id]

  tags = {
    Name = "anime-db-subnet-group"
  }
}

output "rds_endpoint" {
  value = aws_db_instance.mysql.endpoint
}