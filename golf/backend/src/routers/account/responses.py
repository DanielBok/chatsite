from pydantic import BaseModel

import src.repository.account.models as m
from src.services.authentication import auth_svc

__all__ = ['Account']


class Account(BaseModel):
    id: int
    username: str
    first_name: str
    last_name: str
    is_admin: bool
    token: str

    @classmethod
    def from_account(cls, acc: m.Account):
        token = auth_svc.construct_token(acc)
        return cls(**acc.model_dump(include={'username', 'first_name', 'last_name', 'id', 'is_admin'}), token=token)
