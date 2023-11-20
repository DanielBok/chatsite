from pydantic import BaseModel

import src.repository.main.account.models as m
from src.services.authentication import auth_svc

__all__ = ['Account', 'Token']


class Token(BaseModel):
    token: str


class Account(Token):
    id: int
    username: str
    name: str
    is_admin: bool
    image_path: str

    @classmethod
    def from_account(cls, acc: m.Account):
        token = auth_svc.construct_token(acc)
        return cls(**acc.model_dump(include={'username', 'name', 'id', 'is_admin', 'image_path'}), token=token)
