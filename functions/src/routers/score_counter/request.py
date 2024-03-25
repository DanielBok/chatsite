from typing import Annotated

from pydantic import BaseModel, StringConstraints, PositiveInt, Field

import src.repository.score_counter.models as sc_models


class CreateGameRequest(BaseModel):
    name: Annotated[str, StringConstraints(min_length=1, max_length=100, strip_whitespace=True)]
    maxPlayers: PositiveInt = Field(100)


class ScoresGameTask(BaseModel):
    id: PositiveInt
    scores: list[sc_models.Score]
