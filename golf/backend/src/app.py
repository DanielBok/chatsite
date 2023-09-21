import logging
import os
from contextlib import asynccontextmanager
from importlib import import_module
from pathlib import Path
from pkgutil import iter_modules

from fastapi import FastAPI

from src.database.connector import pool

__all__ = ['create_app']

from src.repository.seed import seed_application

VERSION = '1.0'


def create_app():
    _verify_env_vars_defined()
    app = FastAPI(title="My Golf Statistics",
                  description="API service to keep track of my golf statistics",
                  version=VERSION,
                  docs_url=None,
                  redoc_url="/docs",
                  lifespan=lifespan)

    _add_routes(app)

    return app


def _verify_env_vars_defined():
    if os.getenv('DEBUG', '0') != '1':
        # only check when in debug mode
        keys = {
            'APP_FIRST_USER_USERNAME',
            'APP_FIRST_USER_PASSWORD',
            'APP_FIRST_USER_FIRST_NAME',
            'APP_FIRST_USER_LAST_NAME',
            'APP_JWT_SECRET',
            'DB_USER',
            'DB_PASSWORD',
            'DB_HOST',
            'DB_PORT',
        }

        if len(missing := sorted(keys - set(os.environ))):
            raise RuntimeError("The following environment variables must be defined:\n" +
                               '\n'.join(f' - {k}' for k in missing))


@asynccontextmanager
async def lifespan(app: FastAPI):
    logging.info("Opening ConnectionPool for database access")
    pool.open()
    seed_application()

    yield

    pool.close()


def _add_routes(app: FastAPI):
    root_dir = Path(__file__).parents[1]
    routers_dir = Path(__file__).parent / "routers"
    for submodule in iter_modules([routers_dir.as_posix()]):
        if submodule.ispkg and (router_file := routers_dir / submodule.name / "router.py").exists():
            module = import_module('.'.join(router_file.relative_to(root_dir).parts).replace('.py', ''))
            if hasattr(module, 'router'):
                app.include_router(module.router)
