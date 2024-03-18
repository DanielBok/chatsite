import logging
import os
from contextlib import asynccontextmanager
from importlib import import_module
from pathlib import Path

from fastapi import FastAPI, Response, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from starlette_exporter import PrometheusMiddleware, handle_metrics

from constants import APP_NAME, IS_DEBUG
from src.database.connector import pool, close_pool

__all__ = ['create_app']

with open(Path(__file__).parents[1] / '.version') as f:
    VERSION = f.read().strip()


def create_app():
    _verify_env_vars_defined()

    app = FastAPI(title=APP_NAME,
                  description="Chateau des Chats API Service",
                  version=VERSION,
                  docs_url=None,
                  redoc_url="/docs",
                  lifespan=_lifespan)

    _add_middlewares(app)
    _add_healthcheck(app)
    _add_routes(app)

    return app


def _verify_env_vars_defined():
    if not IS_DEBUG:
        # only check when in production mode
        keys = {
            'APP_FIRST_USER_PASSWORD',
            'APP_FIRST_USER_NAME',
            'APP_SECOND_USER_PASSWORD',
            'APP_SECOND_USER_NAME',
            'APP_JWT_SECRET',
            'DATA_HOST',
            'DB_USER',
            'DB_PASSWORD',
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
    pool()

    yield

    close_pool()


def _add_middlewares(app: FastAPI):
    origins = os.environ.get("CORS_ORIGINS", 'http://localhost:3000' if IS_DEBUG else '*').split(',')
    # allow CORS when debugging
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*']
    )

    app.add_middleware(PrometheusMiddleware, app_name='ChateauDesChats')
    app.add_route('/metrics', handle_metrics)


def _add_routes(app: FastAPI):
    root_dir = Path(__file__).parents[1]
    routers_dir = Path(__file__).parent / "routers"

    for router_py in routers_dir.rglob('router.py'):
        module = import_module('.'.join(router_py.relative_to(root_dir).parts).replace('.py', ''))
        if IS_DEBUG and hasattr(module, 'DEBUG_ONLY') and not module.DEBUG_ONLY:
            continue

        if hasattr(module, 'router'):
            app.include_router(module.router)


def _add_healthcheck(app: FastAPI):
    path = '/'

    router = APIRouter(prefix="/healthcheck", tags=["Healthcheck"])

    @router.post(path)
    @router.get(path)
    @router.put(path)
    @router.delete(path)
    @router.options(path)
    def healthcheck():
        return Response()

    app.include_router(router)
