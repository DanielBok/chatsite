import os
import secrets
from base64 import b64decode
from datetime import datetime, timedelta

import jwt
from fastapi import Header, Depends, HTTPException, status

import src.repository.account.models as m
from src.repository.account.repo import AccountRepository


class AuthorizationService:
    def __init__(self):
        self._secret = os.getenv('APPLICATION_AUTHORIZATION_SECRET', secrets.token_hex(32))

    @property
    def _algorithm(self):
        return "HS256"

    def construct_token(self, acc: m.Account):
        nbt = datetime.utcnow()  # not before time
        exp = nbt + timedelta(days=7)  # expiration time

        payload = {
            **acc.model_dump(include={'id'}),
            'nbt': int(nbt.timestamp()),
            'exp': int(exp.timestamp()),
        }

        return jwt.encode(payload, key=self._secret, algorithm=self._algorithm)

    def fetch_with_jwt_token(self, authorization: str, repo: AccountRepository):
        *_, token = authorization.split(' ')
        utc_now_ts = datetime.utcnow().timestamp()
        try:
            payload = jwt.decode(token, self._secret, algorithms=self._algorithm)
            if payload['nbt'] <= utc_now_ts <= payload['exp']:
                return repo.get_account(m.GetAccount(username=payload['username'], password=payload['password']))
            else:
                raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                    detail="JWT has expired, please login again to get a new one.")
        except jwt.DecodeError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Invalid JWT credentials")

    @staticmethod
    def fetch_with_basic_auth(authorization: str, repo: AccountRepository) -> m.Account:
        uid, pwd = b64decode(authorization.split(' ')[1]).decode('utf-8').split(':')
        return repo.get_account(m.GetAccount(username=uid, password=pwd))

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

        if acc is None or not acc.is_valid:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Invalid credentials')

        return acc


auth_svc = AuthorizationService()
