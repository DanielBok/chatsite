import logging

from fastapi import APIRouter, WebSocket
from fastapi.responses import HTMLResponse
from starlette.websockets import WebSocketDisconnect

from src.routers.score_counter.websocket import WebSocketAnnotation

router = APIRouter(prefix="/sc", tags=["Score Counter"])


@router.get("/{game_id}")
async def get_game_page(game_id: str):
    html = f"""<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="name" autocomplete="off" placeholder="Name"/>
            <br/>
        
            <input type="text" id="messageText" autocomplete="off" placeholder="Message"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8080/sc/ws/{game_id}");
            ws.onmessage = function(event) {{
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            }};
            function sendMessage(event) {{
                const nameBox = document.getElementById("name");
                const messageBox = document.getElementById("messageText");
                const message = messageBox.value;
                const name = nameBox.value;
                
                ws.send(JSON.stringify({{ name, message }}));
                messageBox.value = '';
                event.preventDefault();
            }}
        </script>
    </body>
</html>"""

    return HTMLResponse(html)


@router.websocket("/ws/{game_id}")
async def ws_handler(websocket: WebSocket,
                     manager: WebSocketAnnotation,
                     game_id: str):
    await websocket.accept()
    socket_id = id(websocket)
    manager.connect(game_id, socket_id, websocket)

    while True:
        try:
            data = await websocket.receive_json()
            await manager.publish(game_id, f"{data['name']}: {data['message']}")
        except (WebSocketDisconnect, RuntimeError) as err:
            logging.info(f"Disconnected from websocket ({socket_id}): {err}")
            manager.disconnect(game_id, socket_id)
