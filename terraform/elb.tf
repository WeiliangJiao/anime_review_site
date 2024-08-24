resource "aws_lb" "react_lb" {
  name               = "react-lb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.elb_sg.id]
  subnets            = [aws_subnet.public_a.id, aws_subnet.public_b.id]

  tags = {
    Name = "anime-react-lb"
  }
}

resource "aws_lb_target_group" "react_tg" {
  name     = "react-tg"
  port     = 3000
  protocol = "HTTP"
  vpc_id   = aws_vpc.main.id
  target_type = "ip" 
}

resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.react_lb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.react_tg.arn
  }
}

output "react_lb_dns_name" {
  value = aws_lb.react_lb.dns_name
}
