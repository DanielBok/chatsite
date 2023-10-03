from enum import Enum

from pydantic import BaseModel, Field, field_validator, model_validator, FieldValidationInfo
from pydantic.types import StrictBool, conlist


class GolfTeeEnum(str, Enum):
    Green = 'Green'
    Red = 'Red'
    Yellow = 'Yellow'
    White = 'White'
    Blue = 'Blue'
    Black = 'Black'
    Silver = 'Silver'
    Gold = 'Gold'


class GolfDistanceMetric(str, Enum):
    Meter = 'meter'
    Yard = 'yard'


class CreateCourseTeeInfo(BaseModel):
    tee: GolfTeeEnum = Field(description="Tee color for the distance")
    distance: list[int] = Field(list, description="Distance to flag")
    distance_metric: GolfDistanceMetric = Field(description='Whether the distance is marked in meters or yards')

    @field_validator('distance')
    @classmethod
    def check_length_and_value(cls, v: list[int], info: FieldValidationInfo):
        assert len(v) in (9, 18), f"{info.field_name} must have either 9 or 18 values (9 or 18 holes)"
        assert all(isinstance(e, int) and e > 0 for e in v), f"{info.field_name} values must be integers greater than 0"

        return v


class CreateCourse(BaseModel):
    country: str = Field(min_length=1, description="Country which course is in")
    location: str = Field(min_length=1, description="Name of resort/area. e.g.: Keppel Club, or Marina Bay Golf Course")
    course: str = Field(min_length=1, description="Course Name")
    google_map_url: str = Field(description="Google map url")
    active: StrictBool = Field(True, description="True means course is still around. Otherwise, course is defunct")
    par: list[int] = Field(list, description="Par score for each hole")
    index: list[int] = Field(list, description="Index score for each hole")
    tee_info: conlist(CreateCourseTeeInfo, min_length=1) = Field(description="Tee distance information")

    @field_validator('par', 'index')
    @classmethod
    def check_length_and_value(cls, v: list[int], info: FieldValidationInfo):
        assert len(v) in (9, 18), f"{info.field_name} must have either 9 or 18 values (9 or 18 holes)"
        assert all(isinstance(e, int) and e > 0 for e in v), f"{info.field_name} values must be integers greater than 0"

        return v

    @model_validator(mode='after')
    def check_array_lengths_match(self):
        assert (n := len(self.par)) == len(self.index), "par and index length must match"
        assert all(len(x.distance) == n for x in self.tee_info), f"distance field in tee_info must have {n} elements"

        return self


class CourseTeeInfo(CreateCourseTeeInfo):
    id: int = Field(gt=0, description='Course Tee Info ID')


class Course(CreateCourse):
    id: int = Field(gt=0, description='Course ID')
    tee_info: conlist(CourseTeeInfo, min_length=1) = Field(description="Tee distance information")

    @classmethod
    def from_dict(cls, *, value: dict):
        """Used by the class_row to create the Course object. The query must name the json_build_object as 'value'"""
        return cls(**value)
