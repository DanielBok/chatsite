import logging
import os

__all__ = ['seed_main_tables']


def seed_main_tables():
    """Seeds the application with initial data"""
    logging.info("Running data seeding operations")

    _seed_accounts()


def _seed_accounts():
    from src.repository.main.account.repo import AccountRepository
    import src.repository.main.account.models as m

    repo = AccountRepository()
    if len(repo.get_accounts()) == 0:
        logging.info("\tNo accounts in database yet, creating default admin account")
        for username, password, name in [
            (
                    'dbok',
                    os.getenv('APP_FIRST_USER_PASSWORD', 'password'),
                    os.getenv('APP_FIRST_USER_NAME', 'Monkey Chat')
            ),
            (
                    'pquek',
                    os.getenv('APP_SECOND_USER_PASSWORD', 'password'),
                    os.getenv('APP_SECOND_USER_NAME', 'Beaver Chat'),
            )
        ]:
            repo.create_account(m.CreateAccount(username=username, password=password, name=name))
            logging.info(f'\t\tCreated account <{username}>')
    else:
        logging.info("\tSkipping account data seeding")
