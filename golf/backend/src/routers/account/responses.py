from pydantic import BaseModel


class Account(BaseModel):
    username: str
    first_name: str
    last_name: str
    token: str
