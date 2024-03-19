import os
from datetime import datetime, timedelta
from typing import Optional, Annotated

import jwt
import pytz
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

import src.repository.main.account.models as m
from src.repository.main.account.repo import AccountRepository

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="main/account/login")


class AuthenticationService:
    def __init__(self):
        self._secret = os.getenv('APP_JWT_SECRET', 'development-token')

    @property
    def _algorithm(self):
        return "HS256"

    def construct_token(self, acc: m.Account):
        nbt = datetime.now(pytz.UTC)  # not before time
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
        utc_now_ts = datetime.now(pytz.UTC).timestamp()
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

    #
    # def fetch_with_basic_auth(self, authorization: str, repo: AccountRepository) -> Optional[m.Account]:
    #     uid, pwd = b64decode(authorization.split(' ')[1]).decode('utf-8').split(':')
    #
    #     return self.fetch_account(repo, uid, pwd)

    @staticmethod
    def fetch_account(repo: AccountRepository, uid: str, pwd: str) -> Optional[m.Account]:
        acc = repo.get_account(uid)
        # returns the account if it is not None and has a valid password
        return acc if acc is not None and repo.validate_account(acc, pwd) else None

    def __call__(self, token: Annotated[str, Depends(oauth2_scheme)], repo: AccountRepository = Depends()) -> m.Account:
        if token is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail="Need to provide log in details via token or username/password")

        if (acc := self.fetch_with_jwt_token(token, repo)) is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                                detail='Invalid credentials')
        else:
            return acc


auth_svc = AuthenticationService()


def is_admin(acc: m.Account = Depends(auth_svc)):
    if not acc.is_admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,
                            detail="Task requires admin privileges")
    return acc
