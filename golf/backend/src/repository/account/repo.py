import hashlib
import secrets

from psycopg.rows import class_row

import src.repository.account.models as m
from src.database.connector import connection_context, require_connection_pool

__all__ = ['AccountRepository']


@require_connection_pool
class AccountRepository:
    """Repository to handle golf player accounts"""

    @staticmethod
    def _hash_password(password: str, salt: str):
        """Given a password and salt, hash the combination to create a hashed password"""
        return hashlib.sha256(f'{password}{salt}'.encode()).hexdigest() + f':{salt}'

    @classmethod
    def _validate_account(cls, password: str, hashed_password: str, salt: str):
        """
        Checks if the plaintext password matches the hashed password
        """
        return cls._hash_password(password, salt) == hashed_password

    def create_account(self, acc: m.CreateAccount):
        payload = {
            **acc.model_dump(exclude={'password'}),
            'password': self._hash_password(acc.password, secrets.token_hex(32))
        }
        with connection_context() as conn:
            conn.execute("""
            insert into golf.player (username, first_name, last_name, password) 
            values (%(username)s, %(first_name)s, %(last_name)s, %(password)s)
            """, payload)

    def update_account(self, acc: m.UpdateAccount):
        payload = {
            **acc.model_dump(exclude={'password'}),
            'password': self._hash_password(acc.password, secrets.token_hex(32))
        }

        with connection_context() as conn:
            conn.execute("""
            update golf.player
            set username = %(username)s,
                first_name = %(first_name)s,
                last_name = %(last_name)s,
                password = %(password)s
            where id=%(id)s
            """, payload)

    def get_account(self, creds: m.GetAccount):
        """Fetches the account provided by the credentials"""
        with connection_context() as conn:
            with conn.cursor(row_factory=class_row(m.Account)) as cur:
                acc = cur.execute("""
                select id, first_name, last_name, username, password 
                from golf.player
                where username = %(username)s
                """, creds.model_dump(include={'username'})).fetchone()

        if acc is not None:
            acc.is_valid = self._hash_password(creds.password, acc.salt) == acc.password

        return acc
