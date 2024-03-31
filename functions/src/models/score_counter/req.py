from typing import Annotated, Literal

from pydantic import BaseModel, StringConstraints, PositiveInt, Field

from src.models.score_counter import dat


class CreateGameRequest(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=100, strip_whitespace=True)]
    max_players: PositiveInt = Field(100, le=10)


class ScoresGameTask(BaseModel):
    id: PositiveInt
    method: Literal['delta', 'overwrite']
    scores: list[dat.Score]

    def scores_as_dict(self):
        return {s.id: s.score for s in self.scores}


class JoinGameRequest(BaseModel):
    name: str
    uuid: str
    score: float
