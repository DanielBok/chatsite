from pydantic import BaseModel, Field


class GetAccount(BaseModel):
    username: str = Field(min_length=1, max_length=50, description="Unique username")
    password: str = Field(min_length=1, description="Plaintext password")


class CreateAccount(GetAccount):
    first_name: str = Field(min_length=1, max_length=50, description='First name')
    last_name: str = Field(min_length=1, max_length=50, description='Last name')


class UpdateAccount(CreateAccount):
    id: int = Field(gt=0, description='Must be provided to determine which account to update')


class Account(UpdateAccount):
    is_valid: bool = Field(False, exclude=True)

    @property
    def salt(self):
        return self.password.split(':')[-1]
