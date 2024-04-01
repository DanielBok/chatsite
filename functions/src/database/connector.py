import os
from contextlib import contextmanager, nullcontext
from typing import ContextManager, Optional

from psycopg import Connection, Cursor
from psycopg.rows import RowFactory
from psycopg_pool import ConnectionPool

_pool: Optional[ConnectionPool] = None


def pool(host=os.getenv('DATA_HOST', 'localhost'),
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


@contextmanager
def connection_context(
        timeout: float = None,
        connection: Connection = None,
        transaction=False,
) -> ContextManager[Connection]:
    if isinstance(connection, Connection):
        yield connection
    else:
        with pool().connection(timeout=timeout) as conn:  # type: Connection
            with conn.transaction() if transaction else nullcontext():
                yield conn


@contextmanager
def cursor_context[T](timeout: float = None,
                      row_factory: Optional[RowFactory[T]] = None,
                      connection: Connection = None,
                      transaction=False) -> ContextManager[Cursor[T]]:
    with (connection_context(timeout, connection=connection, transaction=transaction) as conn,
          conn.cursor(row_factory=row_factory) as cur):
        yield cur
