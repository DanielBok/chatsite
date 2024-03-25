from pydantic import BaseModel, PositiveInt


class CreateGameResponse(BaseModel):
    id: PositiveInt
    name: str
    maxPlayers: PositiveInt
    creation_time: int
