from typing import Literal
from pydantic import BaseModel, Field


class GetCourse(BaseModel):
    country: str | list[str] = Field(None, title='Country', description="Country of courses to filter for")
    course_id: int | list[int] = Field(None, title='Course ID', description="Course IDs to filter for")
    status: Literal['active', 'inactive'] = Field(None, title="Course Status",
                                                  description="If None, selects all courses. Otherwise, filters for specified activity status")


class UpdateStatus(BaseModel):
    course_id: int
    status: Literal['active', 'inactive']

    @property
    def active(self):
        return self.status == 'active'
