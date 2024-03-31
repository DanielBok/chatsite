from pydantic import PositiveInt, BaseModel


class Score(BaseModel):
    id: PositiveInt
    score: float
