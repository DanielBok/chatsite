import os
from functools import cache
from pymongo import MongoClient


@cache
def _mongo_client(host: str, port: int, username: str, password: str):
    return MongoClient(host, port=int(port), username=username, password=password)


def mongo_db(database: str,
             host=os.getenv('DATA_HOST', 'localhost'),
             port=int(os.getenv('MONGO_PORT', 27017)),
             username=os.getenv('MONGO_USER', 'user'),
             password=os.getenv('MONGO_PASSWORD', 'password')):
    client = _mongo_client(host, port, username, password)
    return client[database]
