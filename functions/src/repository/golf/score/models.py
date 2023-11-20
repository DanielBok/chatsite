from enum import Enum

import pytz
from pydantic import BaseModel, Field, field_validator, AwareDatetime
from pydantic_core.core_schema import FieldValidationInfo

from src.repository.golf.course.models import GolfTeeEnum


class GameEnum(str, Enum):
    Front = 'Front 9'
    Back = 'Back 9'
    Full = '18 Holes'


class CreateScore(BaseModel):
    player_id: int = Field(gt=0)
    course_id: int = Field(gt=0)
    tee: GolfTeeEnum = Field(description="Tee color for the distance")
    game: GameEnum = Field(description="Number of holes played. If 9, specify whether it's Front 9 or Back 9")
    scores: list[int] = Field(list, description="Scores for each hole")
    datetime: AwareDatetime = Field(description="Date golf was played (Timezone needed!)")

    @field_validator('scores')
    @classmethod
    def check_length_and_value(cls, v: list[int], info: FieldValidationInfo):
        assert len(v) in (9, 18), f"{info.field_name} must have either 9 or 18 values (9 or 18 holes)"
        assert all(isinstance(e, int) and e > 0 for e in v), f"{info.field_name} values must be integers greater than 0"

        return v

    @field_validator('datetime')
    @classmethod
    def convert_datetime_to_utc(cls, v):
        return pytz.utc.normalize(v)


class Score(CreateScore):
    id: int = Field(gt=0)
