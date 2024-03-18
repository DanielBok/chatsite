import hashlib
import secrets
from typing import Optional

from psycopg.rows import class_row

import src.repository.main.account.models as m
from src.database.connector import connection_context

__all__ = ['AccountRepository']


class AccountRepository:
    """Repository to handle golf player accounts"""

    @staticmethod
    def _hash_password(password: str, salt: str):
        """Given a password and salt, hash the combination to create a hashed password"""
        return hashlib.sha256(f'{password}{salt}'.encode()).hexdigest() + f':{salt}'

    @staticmethod
    def get_accounts():
        with connection_context() as conn:
            with conn.cursor(row_factory=class_row(m.Account)) as cur:
                return cur.execute('select * from main."user"').fetchall()

    def create_account(self, acc: m.CreateAccount) -> int:
        """Creates a new account and returns the account's ID"""
        payload = {
            **acc.model_dump(exclude={'password'}),
            'password': self._hash_password(acc.password, secrets.token_hex(32))
        }
        with connection_context() as conn:
            # first player will always be admiun
            payload['is_admin'] = conn.execute('select id from main."user"').rowcount == 0

            account_id, *_ = conn.execute("""
            insert into main."user" (username, name, password, is_admin, image_path) 
            values (%(username)s, %(name)s, %(password)s, %(is_admin)s, %(image_path)s)
            returning id
            """, payload).fetchone()
        return account_id

    def update_account(self, acc: m.UpdateAccount):
        """Updates the account"""
        payload = acc.model_dump()
        if 'password' in payload:
            payload['password'] = self._hash_password(payload['password'], secrets.token_hex(32))

        update_fields = [
            f'{field} = %({field})s'
            for field in payload.keys()
            if field != 'id'
        ]

        if len(update_fields) > 0:
            with connection_context() as conn:
                conn.execute(f"""
                update main."user"
                set {', '.join(update_fields)}
                where id=%(id)s
                """, payload)

    @staticmethod
    def get_account(username_or_id: int | str) -> Optional[m.Account]:
        """Fetches an account by ID"""
        if isinstance(username_or_id, int):
            filter_field = 'id'
        elif isinstance(username_or_id, str):
            filter_field = 'username'
        else:
            raise TypeError('username_or_id must be an instance of <str | int>')

        with connection_context() as conn, conn.cursor(row_factory=class_row(m.Account)) as cur:
            return cur.execute(f"""
            select id, name, username, password, is_admin, image_path
            from main."user"
            where {filter_field} = %s
            """, (username_or_id,)).fetchone()

    @classmethod
    def validate_account(cls, acc: m.Account, password: str):
        """
        Checks if the plaintext password matches the hashed password.
        Returns True if account's hashed password matches the provided password after hashing.
        Otherwise, False.
        """
        return cls._hash_password(password, acc.salt) == acc.password

    @staticmethod
    def delete_account(account_id: int):
        with connection_context() as conn:
            conn.execute('delete from main."user" where id = %s', (account_id,))
