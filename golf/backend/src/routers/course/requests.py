from pydantic import BaseModel, Field


class GetCourse(BaseModel):
    country: str | list[str] = Field(None, title='Country', description="Country of courses to filter for")
    course_id: int | list[int] = Field(None, title='Course ID', description="Course IDs to filter for")
    active: bool = Field(None, title="Course Status",
                         description="If None, selects all courses. Otherwise, selects active courses only if True.")
