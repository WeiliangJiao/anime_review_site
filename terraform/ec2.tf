resource "aws_iam_instance_profile" "labrole_profile" {
  name = "LabRoleInstanceProfile"
  role = "LabRole"
}

resource "aws_instance" "flask_backend" {
  ami                    = var.ami_id
  instance_type          = var.instance_type
  subnet_id              = aws_subnet.public_ec2.id
  associate_public_ip_address = true
  security_groups        = [aws_security_group.ec2_sg.id]
  iam_instance_profile   = aws_iam_instance_profile.labrole_profile.name

  user_data = <<EOF
#!/bin/bash
exec > >(tee /var/log/user-data.log|logger -t user-data -s 2>/dev/console) 2>&1
sudo dnf update -y
sudo dnf install -y docker
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker ec2-user

# Login to AWS ECR
aws ecr get-login-password --region us-east-1 | sudo docker login --username AWS --password-stdin 576845476474.dkr.ecr.us-east-1.amazonaws.com

# Pull the Docker image from ECR
sudo docker pull 576845476474.dkr.ecr.us-east-1.amazonaws.com/flask-app:latest

# Run the Flask application with the necessary environment variables
sudo docker run -d \
  -e RDS_HOST=${aws_db_instance.mysql.endpoint} \
  -e RDS_DATABASE=${var.rds_db_name} \
  -e AWS_REGION=us-east-1 \
  -p 80:5000 \
  --name flask-backend \
  576845476474.dkr.ecr.us-east-1.amazonaws.com/flask-app:latest

# Capture the logs of the container
sleep 30
sudo docker logs flask-backend > /var/log/flask-backend.log 2>&1
EOF


  tags = {
    Name = "anime-flask-backend"
  }

  depends_on = [aws_db_instance.mysql]
}

output "ec2_public_ip" {
  value = aws_instance.flask_backend.public_ip
}
