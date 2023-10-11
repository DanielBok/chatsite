from pydantic import BaseModel


class CourseFilterOptions(BaseModel):
    countries: list[str]
