resource "aws_ecs_cluster" "main" {
  name = "main"
}

resource "aws_ecs_task_definition" "react_task" {
  family                   = "react-app"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"
  execution_role_arn       = "arn:aws:iam::576845476474:role/LabRole"

  container_definitions = <<EOF
[
  {
    "name": "react-app",
    "image": "576845476474.dkr.ecr.us-east-1.amazonaws.com/react-app",
    "portMappings": [
      {
        "containerPort": 3000,
        "hostPort": 3000
      }
    ],
    "environment": [
      {
        "name": "REACT_APP_BACKEND_URL",
        "value": "http://${aws_instance.flask_backend.public_ip}"
      }
    ]
  }
]
EOF
}

resource "aws_ecs_service" "react_service" {
  name            = "react-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.react_task.arn
  desired_count   = 1
  launch_type     = "FARGATE"
  network_configuration {
    assign_public_ip = true
    subnets         = [aws_subnet.public_a.id, aws_subnet.public_b.id]
    security_groups = [aws_security_group.ecs_sg.id]
  }
  load_balancer {
    target_group_arn = aws_lb_target_group.react_tg.arn
    container_name   = "react-app"
    container_port   = 3000
  }

  depends_on = [aws_lb.react_lb, aws_lb_target_group.react_tg, aws_lb_listener.http, aws_instance.flask_backend]
}
