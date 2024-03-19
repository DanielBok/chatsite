import asyncio
from collections import defaultdict
from typing import Annotated

from fastapi import WebSocket, Depends


class WebSocketManager:
    def __init__(self, category: str):
        self.category = category
        self._connections: defaultdict[str, dict[int, WebSocket]] = defaultdict(dict)

    def connect(self, group: str, socket_id: int, websocket: WebSocket):
        self._connections[group][socket_id] = websocket

    def disconnect(self, group: str, socket_id: int):
        if group in self._connections:
            ws = self._connections[group].pop(socket_id, None)
            if isinstance(ws, WebSocket):
                del ws

            if len(self._connections[group]) == 0:
                self._connections.pop(group)

    def __call__(self):
        return self

    async def publish(self, group: str, message: str | dict):
        """Emits messages to all websockets in group"""
        async with asyncio.TaskGroup() as tg:
            for ws in self._connections[group].values():
                if isinstance(message, str):
                    tg.create_task(ws.send_text(message))
                elif isinstance(message, dict):
                    tg.create_task(ws.send_json(message))


WebSocketAnnotation = Annotated[WebSocketManager, Depends(WebSocketManager("score-counter"))]
