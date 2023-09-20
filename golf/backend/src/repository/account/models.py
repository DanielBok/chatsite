from pydantic import BaseModel, Field


class CreateAccount(BaseModel):
    username: str = Field(min_length=1, max_length=50, description='Unique username')
    first_name: str = Field(min_length=1, max_length=50, description='First name')
    last_name: str = Field(min_length=1, max_length=50, description='Last name')
    password: str = Field(min_length=1, description="Plaintext password")

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


class GetAccount(BaseModel):
    username: str = Field(min_length=1, max_length=50, description="Username")
    password: str = Field(min_length=1, description="Plaintext password")


class UpdateAccount(CreateAccount):
    id: int = Field(gt=0, description='Must be provided to determine which account to update')


class Account(UpdateAccount):
    is_valid: bool = Field(False, exclude=True)

    @property
    def salt(self):
        return self.password.split(':')[-1]
