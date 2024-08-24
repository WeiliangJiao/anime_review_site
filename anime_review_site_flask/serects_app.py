import boto3
import json
import os
from botocore.exceptions import ClientError

# Get the region from the environment variable
region_name = os.getenv('AWS_REGION', 'us-east-1')

secrets_client = boto3.client('secretsmanager', region_name=region_name)

def get_secret(secret_name):
    try:
        response = secrets_client.get_secret_value(SecretId=secret_name)
        secret = json.loads(response['SecretString'])
        return secret
    except ClientError as e:
        raise Exception(f"Could not retrieve secret: {e.response['Error']['Message']}")

def get_db_credentials():
    secret = get_secret('rdsSecret')
    return secret['username'], secret['password']
