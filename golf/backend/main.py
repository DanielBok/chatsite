import logging

import uvicorn

logging.basicConfig(
    datefmt='%Y-%m-%d %H:%M:%S',
    level=logging.INFO
)

if __name__ == '__main__':
    from src import create_app

    app = create_app()
    uvicorn.run(app, host='0.0.0.0', port=8080)
