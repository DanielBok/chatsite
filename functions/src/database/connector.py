import os
from contextlib import contextmanager
from typing import ContextManager, Optional, TypeVar

from psycopg import Connection, Cursor
from psycopg.rows import RowFactory
from psycopg_pool import ConnectionPool

T = TypeVar('T')

_pool: Optional[ConnectionPool] = None


def pool(host=os.getenv('DB_HOST', 'localhost'),
         port=os.getenv('DB_PORT', 5432),
         user=os.getenv('DB_USER', 'user'),
         password=os.getenv('DB_PASSWORD', 'password'),
         recreate_pool=False):
    global _pool
    if _pool is None or recreate_pool:
        conn_string = "postgresql://{user}:{password}@{host}:{port}/chatsite".format(
            user=user,
            password=password,
            host=host,
            port=port,
        )

        _pool = ConnectionPool(conn_string, open=True)

    if _pool._closed:
        _pool.open()

    return _pool


def close_pool():
    global _pool

    if _pool is not None:
        _pool.close()
        _pool = None


def get_connection():
    """
    Gets a raw connection object. Used for debugging purposes. For all other usages,
    please use the connection/cursor context to properly close the connection after
    code is complete.
    """
    return pool().getconn()


@contextmanager
def connection_context(timeout: float = None) -> ContextManager[Connection]:
    with pool().connection(timeout=timeout) as conn:  # type: Connection
        yield conn


@contextmanager
def cursor_context(timeout: float = None, row_factory: Optional[RowFactory[T]] = None) -> ContextManager[Cursor[T]]:
    with connection_context(timeout) as conn, conn.cursor(row_factory=row_factory) as cur:
        yield cur
