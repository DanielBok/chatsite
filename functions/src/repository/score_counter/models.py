from pydantic import PositiveInt, BaseModel


class Player(BaseModel):
    name: str
    uuid: str


class Score(BaseModel):
    id: PositiveInt
    score: float


class PlayerScore(Player, Score):
    pass
