import logging
import os
from contextlib import asynccontextmanager
from importlib import import_module
from pathlib import Path
from pkgutil import iter_modules

from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

from constants import APP_NAME, IS_DEBUG
from src.database.connector import pool
from src.repository.seed import seed_application

__all__ = ['create_app']

with open(Path(__file__).parents[1] / '.version') as f:
    VERSION = f.read().strip()


def create_app():
    app = FastAPI(title=APP_NAME,
                  description="API service to keep track of my golf statistics",
                  version=VERSION,
                  docs_url=None,
                  redoc_url="/docs",
                  lifespan=_lifespan)

    _add_middlewares(app)
    _add_healthcheck(app)
    _add_routes(app)

    return app


def _verify_env_vars_defined(is_debug: bool):
    if not is_debug:
        # only check when in production mode
        keys = {
            'APP_FIRST_USER_PASSWORD',
            'APP_FIRST_USER_NAME',
            'APP_SECOND_USER_PASSWORD',
            'APP_SECOND_USER_NAME',
            'APP_JWT_SECRET',
            'DB_USER',
            'DB_PASSWORD',
            'DB_HOST',
            'DB_PORT',
            'DO_SPACES_ACCESS_ID',
            'DO_SPACES_SECRET_KEY',
        }

        if len(missing := sorted(keys - set(os.environ))):
            raise RuntimeError("The following environment variables must be defined:\n" +
                               '\n'.join(f' - {k}' for k in missing))


@asynccontextmanager
async def _lifespan(app: FastAPI):
    logging.info("Opening ConnectionPool for database access")
    pool.open()
    seed_application()

    yield

    pool.close()


def _add_middlewares(app: FastAPI):
    if IS_DEBUG:
        # allow CORS when debugging
        origins = ['http://localhost:3000']
        app.add_middleware(
            CORSMiddleware,
            allow_origins=origins,
            allow_credentials=True,
            allow_methods=['*'],
            allow_headers=['*']
        )


def _add_routes(app: FastAPI):
    root_dir = Path(__file__).parents[1]
    routers_dir = Path(__file__).parent / "routers"
    for submodule in iter_modules([routers_dir.as_posix()]):
        if submodule.ispkg and (router_file := routers_dir / submodule.name / "router.py").exists():
            module = import_module('.'.join(router_file.relative_to(root_dir).parts).replace('.py', ''))
            if hasattr(module, 'router'):
                app.include_router(module.router)


def _add_healthcheck(app: FastAPI):
    path = '/healthcheck'

    @app.post(path)
    @app.get(path)
    @app.put(path)
    @app.delete(path)
    @app.options(path)
    def healthcheck():
        return Response()
