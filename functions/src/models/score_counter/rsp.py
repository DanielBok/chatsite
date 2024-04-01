from pydantic import BaseModel, PositiveInt, PastDatetime

from src.models.score_counter import dat


class CreateGameResponse(BaseModel):
    id: PositiveInt
    name: str
    max_players: PositiveInt
    creation_time: PastDatetime


class PlayerScore(dat.Score):
    name: str
