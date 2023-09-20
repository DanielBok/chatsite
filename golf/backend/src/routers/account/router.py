from fastapi import Depends, APIRouter

import src.repository.account.models as m
import src.routers.account.responses as resp
from src.services.authentication import auth_svc

router = APIRouter(prefix="/account", tags=["Account Management"])


@router.get("/login", response_model=resp.Account)
def login(acc: m.Account = Depends(auth_svc)):
    token = auth_svc.construct_token(acc)

    return resp.Account(**acc.model_dump(include={'username', 'first_name', 'last_name'}), token=token)
