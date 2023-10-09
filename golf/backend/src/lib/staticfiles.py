from pathlib import Path

# In the docker image (python:alpine), Path.home() is /root. We will bind mount this with
# Path with the underlying server's /<home>/staticfiles folder
# So /root/static <-> /<home>/chatsite/golf-for-chats/
# The folder in the host server `/<home>/chatsite/golf-for-chats/` will need to be created
# once manually
STATIC_PATH = Path.home() / 'static'


def save_file(obj, name: str):
    """Saves the file object into"""
    filepath = STATIC_PATH / name.lstrip('/')
    filepath.parent.mkdir(mode=0o777, parents=True, exist_ok=True)
