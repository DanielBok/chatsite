from pydantic import BaseModel, Field


class UpdateAccount(BaseModel):
    username: str | None = Field(None)
    password: str | None = Field(None)
    first_name: str | None = Field(None)
    last_name: str | None = Field(None)
