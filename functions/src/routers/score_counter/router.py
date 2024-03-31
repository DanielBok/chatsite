import logging
from typing import Annotated

from fastapi import APIRouter, WebSocket, Depends, WebSocketDisconnect, status, HTTPException
from starlette.websockets import WebSocketState

from src.models.score_counter import req, rsp
from src.repository.score_counter import ScoreCounterRepo
from src.routers.score_counter.websocket import WebSocketAnnotation

router = APIRouter(prefix="/sc", tags=["Score Counter"])


@router.get("/game/{game_id}", response_model=rsp.CreateGameResponse)
async def check_game_status(repo: Annotated[ScoreCounterRepo, Depends()], game_id: int):
    if (game := repo.get_current_game(game_id)) is None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Game does not exist")
    return game


@router.post("/game", response_model=rsp.CreateGameResponse)
async def create_game(payload: req.CreateGameRequest, repo: Annotated[ScoreCounterRepo, Depends()]):
    details, err = repo.create_game(payload)
    if err is not None:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=err)
    return details


@router.post("game/{game_id}/join", response_model=list[rsp.PlayerScore])
async def join_game(game_id: int, payload: req.JoinGameRequest, repo: Annotated[ScoreCounterRepo, Depends()]):
    repo.join_game(game_id, payload)
    return repo.get_scores(game_id)


@router.websocket("/game/ws/{game_id}")
async def game_ws_handler(websocket: WebSocket,
                          manager: WebSocketAnnotation,
                          game_id: int,
                          repo: Annotated[ScoreCounterRepo, Depends()]):
    game = repo.get_current_game(game_id)
    if manager.num_players(game_id) >= game.max_players:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Game already at maximum capacity")

    await websocket.accept()
    socket_id = manager.connect(websocket, game_id)

    # send the websocket a copy of the data, subsequent data is broadcast
    # either by current websocket, or other websockets which trigger the
    # receive_json method
    await manager.send(game_id, socket_id, [x.model_dump() for x in repo.get_scores(game_id)])

    while websocket.application_state == WebSocketState.CONNECTED:
        try:
            data = req.ScoresGameTask(**await websocket.receive_json())
            if data.method == 'overwrite':
                scores, err = repo.update_scores(game_id, data.scores)
            else:
                delta = data.scores_as_dict()
                scores, err = repo.get_scores(game_id)
                if err is None:
                    for score in scores:
                        score.score += delta[score.id]
                    scores, err = repo.update_scores(game_id, scores)

            await manager.broadcast(game_id, {'scores': scores, 'error': err})

        except* WebSocketDisconnect as eg:
            logging.info(f"Disconnected from websocket ({socket_id}): {eg.exceptions}")
