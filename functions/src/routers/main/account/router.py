from typing import Annotated

from fastapi import Depends, APIRouter, HTTPException, status, Form, UploadFile, File

import src.repository.main.account.models as m
import src.routers.main.account.responses as resp
from src.lib.staticfiles import save_file, delete_file
from src.repository.main.account.repo import AccountRepository
from src.services.authentication import auth_svc, is_admin

router = APIRouter(prefix="/main/account", tags=["Account Management"])


@router.get("/login", response_model=resp.Token)
def login(acc: m.Account = Depends(auth_svc)):
    return {'token': auth_svc.construct_token(acc)}


@router.get('/verify')
def verify(_: m.Account = Depends(auth_svc)):
    """Verify if the JWT token is valid"""
    return "Okay"


@router.put('/', response_model=resp.Account)
def update_account(username: str = Form(None),
                   password: str = Form(None),
                   name: str = Form(None),
                   image: UploadFile = File(None),
                   acc: m.Account = Depends(auth_svc),
                   repo: AccountRepository = Depends()):
    # set filename to be '<name>.<file extension>'
    filename = f"{name or acc.name}.{image.filename.split('.')[-1]}" if image is not None else ''
    with save_file(image, f'golf/avatar/{filename}') as file_url:
        if file_url is not None:
            old_image_path = repo.get_account(acc.id).image_path
        else:
            old_image_path = None

        payload = m.UpdateAccount(
            id=acc.id,
            username=username,
            password=password,
            name=name,
            image_path=file_url if file_url is not None else None,
        ).remove_unnecessary_updates(acc)

        repo.update_account(payload)

    # clean up image
    if isinstance(old_image_path, str):
        delete_file(old_image_path[old_image_path.index('golf/avatar/'):])

    acc = repo.get_account(acc.id)
    return resp.Account.from_account(acc)


@router.post('/', response_model=resp.Account, dependencies=[Depends(is_admin)])
def create_account(username: Annotated[str, Form()],
                   password: Annotated[str, Form()],
                   name: Annotated[str, Form()],
                   image: UploadFile,
                   repo: AccountRepository = Depends()):
    with save_file(image, f"golf/avatar/{name}.{image.filename.split('.')[-1]}") as url:
        account_id = repo.create_account(m.CreateAccount(
            username=username,
            password=password,
            name=name,
            image_path=url
        ))

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
