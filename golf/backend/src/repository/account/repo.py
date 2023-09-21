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

    @staticmethod
    def get_accounts():
        with connection_context() as conn:
            with conn.cursor(row_factory=class_row(m.Account)) as cur:
                return cur.execute("select * from golf.player").fetchall()

    def create_account(self, acc: m.CreateAccount) -> int:
        """Creates a new account and returns the account's ID"""
        payload = {
            **acc.model_dump(exclude={'password'}),
            'password': self._hash_password(acc.password, secrets.token_hex(32))
        }
        with connection_context() as conn:
            # first player will always be admiun
            payload['is_admin'] = conn.execute("""select id from golf.player""").rowcount == 0

            account_id, *_ = conn.execute("""
            insert into golf.player (username, first_name, last_name, password, is_admin) 
            values (%(username)s, %(first_name)s, %(last_name)s, %(password)s, %(is_admin)s)
            returning id
            """, payload).fetchone()
        return account_id

    def update_account(self, acc: m.UpdateAccount):
        """Updates the account"""
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
                select id, first_name, last_name, username, password, is_admin
                from golf.player
                where username = %(username)s
                """, creds.model_dump(include={'username'})).fetchone()

        # return None if the credentials do not match
        if acc is not None and self._hash_password(creds.password, acc.salt) == acc.password:
            return None

        return acc

    @staticmethod
    def get_account_by_id(account_id: int) -> m.Account:
        """Fetches an account by ID"""
        with connection_context() as conn:
            with conn.cursor(row_factory=class_row(m.Account)) as cur:
                return cur.execute("""
                select id, first_name, last_name, username, password, is_admin
                from golf.player
                where id = %s
                """, (account_id,)).fetchone()

    @staticmethod
    def delete_account(account_id: int):
        with connection_context() as conn:
            conn.execute("delete from golf.player where id = %s", (account_id,))
