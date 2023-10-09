import os
from base64 import b64decode
from datetime import datetime, timedelta
from typing import Optional

import jwt
from fastapi import Header, Depends, HTTPException, status

import src.repository.account.models as m
from src.repository.account.repo import AccountRepository


class AuthenticationService:
    def __init__(self):
        self._secret = os.getenv('APP_JWT_SECRET', 'development-token')

    @property
    def _algorithm(self):
        return "HS256"

    def construct_token(self, acc: m.Account):
        nbt = datetime.utcnow()  # not before time
        exp = nbt + timedelta(days=7)  # expiration time

        payload = {
            'id': acc.id,
            'username': acc.username,
            'name': acc.name,
            'isAdmin': acc.is_admin,
            'imagePath': acc.image_path,
            'nbt': int(nbt.timestamp()),
            'exp': int(exp.timestamp()),
        }

        return jwt.encode(payload, key=self._secret, algorithm=self._algorithm)

    def fetch_with_jwt_token(self, authorization: str, repo: AccountRepository) -> Optional[m.Account]:
        *_, token = authorization.split(' ')
        utc_now_ts = datetime.utcnow().timestamp()
        try:
            payload = jwt.decode(token, self._secret, algorithms=self._algorithm)
            if payload['nbt'] <= utc_now_ts <= payload['exp']:
                return repo.get_account(payload['id'])
            else:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                    detail="JWT has expired, please login again to get a new one.")
        except jwt.DecodeError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Invalid JWT credentials")

    @staticmethod
    def fetch_with_basic_auth(authorization: str, repo: AccountRepository) -> Optional[m.Account]:
        uid, pwd = b64decode(authorization.split(' ')[1]).decode('utf-8').split(':')
        acc = repo.get_account(uid)

        # returns the account if it is not None and has a valid password
        return acc if acc is not None and repo.validate_account(acc, pwd) else None

    def __call__(self,
                 authorization: str | None = Header(None),
                 repo: AccountRepository = Depends()):
        if authorization is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Need to provide log in details via token or username/password")

        if authorization.startswith('Bearer'):
            acc = self.fetch_with_jwt_token(authorization, repo)
        else:
            acc = self.fetch_with_basic_auth(authorization, repo)

        if acc is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Invalid credentials')

        return acc


auth_svc = AuthenticationService()


def is_admin(acc: m.Account = Depends(auth_svc)):
    if not acc.is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Task requires admin privileges")
    return acc
