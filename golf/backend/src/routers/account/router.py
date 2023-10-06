from fastapi import Depends, APIRouter, HTTPException, status

import src.repository.account.models as m
import src.routers.account.responses as resp
from src.repository.account.repo import AccountRepository
from src.services.authentication import auth_svc, is_admin

router = APIRouter(prefix="/account", tags=["Account Management"])


@router.get("/login", response_model=resp.Token)
def login(acc: m.Account = Depends(auth_svc)):
    return {'token': auth_svc.construct_token(acc)}


@router.put('/', response_model=resp.Account)
def update_account(changes: m.CreateAccount,
                   acc: m.Account = Depends(auth_svc),
                   repo: AccountRepository = Depends()):
    repo.update_account(m.UpdateAccount(
        id=acc.id,
        **changes.model_dump()
    ))

    acc = repo.get_account(acc.id)
    return resp.Account.from_account(acc)


@router.post('/', response_model=resp.Account, dependencies=[Depends(is_admin)])
def create_account(new_acc: m.CreateAccount, repo: AccountRepository = Depends()):
    account_id = repo.create_account(new_acc)

    acc = repo.get_account(account_id)
    return resp.Account.from_account(acc)


@router.delete('/', status_code=status.HTTP_200_OK)
def delete_account(acc: m.Account = Depends(auth_svc), repo: AccountRepository = Depends()):
    """
    Deletes the account specified by the account_id. The user initiating this request must be an admin.
    """
    if acc.is_admin:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,
                            detail="Admin account must be deleted manually")

    repo.delete_account(acc.id)
