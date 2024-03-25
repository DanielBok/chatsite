import asyncio
import json
from collections import defaultdict
from typing import Annotated

from fastapi import WebSocket, Depends


class GameWSManager:
    def __init__(self, category: str):
        self.category = category

        self._id_to_game: dict[int, int] = {}
        # a map where the socket id points to the game the socket belongs to

        self._games: defaultdict[int, dict[int, WebSocket]] = defaultdict(dict)
        # a map where the key is the game id and the value is a set of websockets that belong to the game

    def num_players(self, game_id: int) -> int:
        return len(self._games.get(game_id, {}))

    def connect(self, websocket: WebSocket, game_id: int) -> int:
        """Connects a websocket to the game. Returns the ID of the websocket for cleanups"""
        socket_id = id(websocket)
        self._games[game_id][socket_id] = websocket
        self._id_to_game[socket_id] = game_id

        return socket_id

    def disconnect(self, socket_id: int) -> int:
        """Deletes a websocket from the manager. Returns the number of websockets left in the game"""
        game_id = self._id_to_game.pop(socket_id)
        sockets = self._games[game_id]

        if socket_id in sockets:
            del sockets[socket_id]

        if len(sockets) == 0:
            del self._games[game_id]
            return 0
        else:
            return len(sockets)

    def __call__(self):
        return self

    async def send(self, game_id: int, socket_id: int, message: str | dict | list):
        ws = self._games[game_id][socket_id]
        if not isinstance(message, str):
            message = json.dumps(message)
        await ws.send_text(message)

    async def broadcast(self, game_id: int, message: str | dict | list):
        """Emits message to all websockets in game"""
        async with asyncio.TaskGroup() as tg:
            for socket_id in self._games[game_id]:
                tg.create_task(self.send(game_id, socket_id, message))


WebSocketAnnotation = Annotated[GameWSManager, Depends(GameWSManager("score-counter"))]
