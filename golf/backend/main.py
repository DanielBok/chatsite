import os

import uvicorn

if __name__ == '__main__':
    if int(os.getenv('DEBUG', '0')):
        uvicorn.run('src:create_app', host='0.0.0.0', port=8080, reload=True, workers=1)
    else:
        uvicorn.run('src:create_app', host='0.0.0.0', port=8080)
