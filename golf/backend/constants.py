import os

APP_NAME = 'Golf for Chats'
IS_DEBUG = os.getenv('DEBUG', '0') == '1'  # if DEBUG env var == 1, then debug mode