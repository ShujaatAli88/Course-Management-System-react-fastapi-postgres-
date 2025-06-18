import psycopg2
from .db_config import Config

def get_connection():
    return psycopg2.connect(
        host=Config.db_host,
        database=Config.db_name,
        user=Config.db_user,
        password=Config.db_password,
    )
