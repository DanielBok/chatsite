from pydantic import BaseModel, Field


class CreateAccount(BaseModel):
    username: str = Field(min_length=1, max_length=50, description="Unique username")
    password: str = Field(min_length=1, description="Plaintext password")
    name: str = Field(min_length=1, max_length=50, description="User's name")
    image_path: str = Field('', description="Image path URL")


class UpdateAccount(CreateAccount):
    id: int = Field(gt=0, description='Must be provided to determine which account to update')


class Account(UpdateAccount):
    id: int = Field(gt=0, description='Account ID')
    is_admin: bool = Field(False, exclude=False)

    @property
    def salt(self):
        return self.password.split(':')[-1]
