resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr

  tags = {
    Name = "anime-vpc"
  }
}

resource "aws_subnet" "public_a" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[0]
  map_public_ip_on_launch = true
  availability_zone       = element(data.aws_availability_zones.available.names, 0)

  tags = {
    Name = "anime-public-subnet-a"
  }
}

resource "aws_subnet" "public_b" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = var.public_subnet_cidrs[1]
  map_public_ip_on_launch = true
  availability_zone       = element(data.aws_availability_zones.available.names, 1)

  tags = {
    Name = "anime-public-subnet-b"
  }
}

resource "aws_subnet" "public_ec2" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.public_subnet_cidr_ec2
  map_public_ip_on_launch = true
  availability_zone = element(data.aws_availability_zones.available.names, 0)

  tags = {
    Name = "anime-public-subnet-ec2"
  }
}

resource "aws_subnet" "private_rds_a" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs_rds[0]
  availability_zone = element(data.aws_availability_zones.available.names, 0)

  tags = {
    Name = "anime-private-subnet-rds-a"
  }
}

resource "aws_subnet" "private_rds_b" {
  vpc_id            = aws_vpc.main.id
  cidr_block        = var.private_subnet_cidrs_rds[1]
  availability_zone = element(data.aws_availability_zones.available.names, 1)

  tags = {
    Name = "anime-private-subnet-rds-b"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "anime-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "anime-routes"
  }
}

resource "aws_route_table_association" "public_assoc_a" {
  subnet_id      = aws_subnet.public_a.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_assoc_b" {
  subnet_id      = aws_subnet.public_b.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public_assoc_c" {
  subnet_id      = aws_subnet.public_ec2.id
  route_table_id = aws_route_table.public.id
}
