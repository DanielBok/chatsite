import os
from contextlib import contextmanager
from typing import ContextManager, Optional, TypeVar

from psycopg import Connection, Cursor
from psycopg.rows import RowFactory
from psycopg_pool import ConnectionPool

T = TypeVar('T')

conn_string = "postgresql://{user}:{password}@{host}:{port}/chatsite".format(
    user=os.getenv('DB_USER', 'user'),
    password=os.getenv('DB_PASSWORD', 'password'),
    host=os.getenv('DB_HOST', 'localhost'),
    port=os.getenv('DB_PORT', 5432),
)

_pool: Optional[ConnectionPool] = None


def pool():
    global _pool
    if _pool is None:
        _pool = ConnectionPool(conn_string, open=True)

    if _pool._closed:
        _pool.open()

    return _pool


def close_pool():
    global _pool

    if _pool is not None:
        _pool.close()
        _pool = None


@contextmanager
def connection_context(timeout: float = None) -> ContextManager[Connection]:
    with pool().connection(timeout=timeout) as conn:  # type: Connection
        yield conn


@contextmanager
def cursor_context(timeout: float = None, row_factory: Optional[RowFactory[T]] = None) -> ContextManager[Cursor[T]]:
    with connection_context(timeout) as conn, conn.cursor(row_factory=row_factory) as cur:
        yield cur
