DEBUG_ONLY = True

from fastapi import APIRouter

from src.database.manager import MigrationManager
from src.lib.responses import Ok
from src.repository.seed import seed_application

router = APIRouter(prefix="/dev", tags=["Data operations"])


@router.get('/db/reset')
def reset_database():
    manager = MigrationManager()
    manager.reset()

    seed_application()

    return Ok("Database has been wiped and reset")
