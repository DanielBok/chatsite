import os
from contextlib import contextmanager
from typing import ContextManager

from psycopg import Connection
from psycopg_pool import ConnectionPool

conn_string = "postgresql://{user}:{password}@{host}:{port}/chatsite".format(
    user=os.getenv('DB_USER', 'user'),
    password=os.getenv('DB_PASSWORD', 'password'),
    host=os.getenv('DB_HOST', 'localhost'),
    port=os.getenv('DB_PORT', 5432),
)

pool = ConnectionPool(conn_string, open=False)


@contextmanager
def connection_context(timeout: float = None) -> ContextManager[Connection]:
    pool.open()
    with pool.connection(timeout=timeout) as conn:  # type: Connection
        yield conn


def require_connection_pool(cls):
    """Decorator to open the ConnectionPool if it is closed"""
    if pool._closed:
        pool.open()

    return cls
