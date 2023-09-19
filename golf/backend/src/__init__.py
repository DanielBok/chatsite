import os
from importlib import import_module
from pathlib import Path
from pkgutil import iter_modules

from fastapi import FastAPI

from src.database.connector import pool

__all__ = ['create_app']


def create_app():
    app = FastAPI(title="My Golf Statistics",
                  description="API service to keep track of my golf statistics",
                  version=os.environ.get('APPLICATION_VERSION', 'TEST'),
                  docs_url=None,
                  redoc_url="/docs")

    _add_routes(app)
    _init_database(app)

    return app


def _add_routes(app: FastAPI):
    root_dir = Path(__file__).parents[1]
    routers_dir = Path(__file__).parent / "routers"
    for submodule in iter_modules([routers_dir.as_posix()]):
        if submodule.ispkg and (router_file := routers_dir / submodule.name / "router.py").exists():
            module = import_module('.'.join(router_file.relative_to(root_dir).parts).replace('.py', ''))
            if hasattr(module, 'router'):
                app.include_router(module.router)


def _init_database(app: FastAPI):
    @app.on_event('startup')
    def open_pool():
        pool.open()

    @app.on_event('close')
    def close_pool():
        pool.close()
