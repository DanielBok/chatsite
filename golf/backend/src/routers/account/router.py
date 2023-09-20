from fastapi import Depends, HTTPException, APIRouter
from fastapi.responses import Response

# from src.dependencies.authentication import AuthHandler, UserAuthenticator
# from src.infrastructure.repository.accounts import Account, AccountsRepo
# from . import models as m

router = APIRouter(prefix="/account", tags=["Account Management"])
