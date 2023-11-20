import logging

from src.repository.golf.seed import seed_golf_tables
from src.repository.main.seed import seed_main_tables

__all__ = ['seed_application']


def seed_application():
    """Seeds the application with initial data"""
    logging.info("Running data seeding operations")

    seed_main_tables()
    seed_golf_tables()
