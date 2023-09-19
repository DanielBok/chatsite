import os

from psycopg_pool import ConnectionPool

conn_string = "postgresql://{user}:{password}@{host}:{port}/chatsite".format(
    user=os.getenv('DB_USER', 'user'),
    password=os.getenv('DB_PASSWORD', 'password'),
    host=os.getenv('DB_HOST', 'localhost'),
    port=os.getenv('DB_PORT', 5432),
)

pool = ConnectionPool(conn_string, open=False)
