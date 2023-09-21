import logging
import os

from src.database.connector import require_connection_pool

__all__ = ['seed_application']


@require_connection_pool
def seed_application():
    """Seeds the application with initial data"""
    logging.info("Running data seeding operations")

    _seed_player_table()


def _seed_player_table():
    from src.repository.account.repo import AccountRepository
    import src.repository.account.models as m

    repo = AccountRepository()
    if len(repo.get_accounts()) == 0:
        logging.info("\tNo accounts in database yet, creating default admin account")
        repo.create_account(m.CreateAccount(
            username=os.getenv('APP_FIRST_USER_USERNAME', 'dbok'),
            password=os.getenv('APP_FIRST_USER_PASSWORD', 'password'),
            first_name=os.getenv('APP_FIRST_USER_FIRST_NAME', 'Daniel'),
            last_name=os.getenv('APP_FIRST_USER_LAST_NAME', 'Bok'),
        ))
    else:
        logging.info("\tSkipping player data seeding")
