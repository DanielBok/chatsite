from typing import Optional, Any, Literal

from pydantic import BaseModel, Field


class CreateAccount(BaseModel):
    username: str = Field(min_length=1, max_length=50, description="Unique username")
    password: str = Field(min_length=1, description="Plaintext password")
    name: str = Field(min_length=1, max_length=50, description="User's name")
    image_path: str = Field('', description="Image path URL")


class UpdateAccount(CreateAccount):
    id: int = Field(gt=0, description='Must be provided to determine which account to update')
    username: Optional[str] = Field(min_length=1, max_length=50, description="Unique username")
    password: Optional[str] = Field(min_length=1, description="Plaintext password")
    name: Optional[str] = Field(min_length=1, max_length=50, description="User's name")
    image_path: Optional[str] = Field('', description="Image path URL")

    def remove_unnecessary_updates(self, current: CreateAccount):
        for attr in ['username', 'name', 'image_path']:
            # force field to be None (and thus not update it) if the current field value and
            # the update field value are exactly the same
            if (v := getattr(self, attr)) is not None and v == getattr(current, attr):
                setattr(self, attr, None)

        return self

    def model_dump(
            self,
            *,
            mode: Literal['json', 'python'] | str = 'python',
            include: set[str] = None,
            exclude: set[str] = None,
            by_alias: bool = False,
            exclude_unset: bool = False,
            exclude_defaults: bool = False,
            exclude_none: bool = False,
            round_trip: bool = False,
            warnings: bool = True,
    ) -> dict[str, Any]:
        model = super().model_dump(mode=mode,
                                   include=include,
                                   exclude=exclude,
                                   by_alias=by_alias,
                                   exclude_unset=exclude_unset,
                                   exclude_defaults=exclude_defaults,
                                   exclude_none=exclude_none,
                                   round_trip=round_trip,
                                   warnings=warnings)
        return {k: v for k, v in model.items() if v is not None}


class Account(UpdateAccount):
    id: int = Field(gt=0, description='Account ID')
    is_admin: bool = Field(False, exclude=False)

    @property
    def salt(self):
        return self.password.split(':')[-1]
