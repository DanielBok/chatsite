import logging
from typing import Annotated

from fastapi import APIRouter, WebSocket, Depends, WebSocketDisconnect, status, HTTPException
from starlette.websockets import WebSocketState

import src.routers.score_counter.request as req
import src.routers.score_counter.response as res
from src.repository.score_counter.repo import ScoreCounterRepo
from src.routers.score_counter.websocket import WebSocketAnnotation

router = APIRouter(prefix="/sc", tags=["Score Counter"])


@router.get("/game/{game_id}", response_model=res.CreateGameResponse)
async def check_game_status(repo: Annotated[ScoreCounterRepo, Depends()],
                            game_id: int):
    # if (game := repo.get_current_game(game_id)) is None:
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Game does not exist")
    # return game

    from datetime import datetime

    return res.CreateGameResponse(id=1,
                                  name='test',
                                  maxPlayers=4,
                                  creation_time=int(datetime.now().timestamp() * 1000))


@router.post("/game", response_model=res.CreateGameResponse)
async def create_game(payload: req.CreateGameRequest, repo: Annotated[ScoreCounterRepo, Depends()]):
    # details, err = repo.create_game(payload.name, payload.max_players)
    # if err is not None:
    #     raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    # return details
    from datetime import datetime

    return res.CreateGameResponse(id=1,
                                  name=payload.name,
                                  maxPlayers=payload.maxPlayers,
                                  creation_time=int(datetime.now().timestamp() * 1000))
    # raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail='test')


@router.websocket("/game/ws-mock/{game_id}")
async def mock_ws_handler(websocket: WebSocket,
                          manager: WebSocketAnnotation,
                          game_id: int):
    await websocket.accept()

    socket_id = manager.connect(websocket, game_id)
    try:
        scores = [
            {'id': 1, 'name': 'Daniel', 'uuid': 'uuid1', 'score': 0},
            {'id': 2, 'name': 'Priscilla', 'uuid': 'uuid2', 'score': 0},
            {'id': 3, 'name': 'Timothy', 'uuid': 'uuid3', 'score': 0},
            {'id': 4, 'name': 'Nathaniel', 'uuid': 'uuid4', 'score': 0},
        ]
        await manager.broadcast(game_id, scores)

        while websocket.application_state == WebSocketState.CONNECTED:
            import random
            import asyncio
            try:
                await asyncio.sleep(2)
                new_scores = [
                    {**s, 'score': s['score'] + random.randint(-10, 10)}
                    for s in scores
                ]
                await manager.broadcast(game_id, new_scores)
            except* WebSocketDisconnect as eg:
                logging.info(f"Disconnected from websocket ({socket_id}): {eg.exceptions}")
    finally:
        manager.disconnect(socket_id)


@router.websocket("/game/ws/{game_id}")
async def game_ws_handler(websocket: WebSocket,
                          manager: WebSocketAnnotation,
                          game_id: int,
                          repo: Annotated[ScoreCounterRepo, Depends()]):
    game = repo.get_current_game(game_id)
    if manager.num_players(game_id) >= game.maxPlayers:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Game already at maximum capacity")

    await websocket.accept()
    socket_id = manager.connect(websocket, game_id)

    try:
        # send the websocket a copy of the data, subsequent data is broadcast
        # either by current websocket, or other websockets which trigger the
        # receive_json method
        await manager.send(game_id, socket_id, [x.model_dump() for x in repo.get_scores(game_id)])

        while websocket.application_state == WebSocketState.CONNECTED:
            try:
                data = req.ScoresGameTask(**await websocket.receive_json())
                scores = repo.update_scores(data.scores)
                await manager.broadcast(game_id, scores)

            except* WebSocketDisconnect as eg:
                logging.info(f"Disconnected from websocket ({socket_id}): {eg.exceptions}")
    finally:
        if manager.disconnect(socket_id) == 0:
            repo.end_game(game_id)
