from abc import ABC
from typing import Literal

from pydantic import BaseModel


class Ingredient(BaseModel):
    key: str
    desc: str


class BaseRecipe(BaseModel, ABC):
    source: Literal['ninja']
    name: str
    ingredients: list[Ingredient]
    directions: list[str]
