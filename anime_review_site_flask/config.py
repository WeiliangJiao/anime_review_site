from serects_app import get_db_credentials
import os

username, password = get_db_credentials()
host = os.getenv('RDS_HOST')
database = os.getenv('RDS_DATABASE')

class Config:
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{username}:{password}@{host}/{database}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
