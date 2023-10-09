import logging
import os
from contextlib import contextmanager
from dataclasses import dataclass
from pathlib import Path
from typing import Optional, ContextManager

from starlette.datastructures import UploadFile
from starlette.requests import Request

# In the docker image (python:alpine), Path.home() is /root. We will bind mount this with
# Path with the underlying server's /<home>/staticfiles folder
# So /root/static <-> /<home>/chatsite/golf-for-chats/
# The folder in the host server `/<home>/chatsite/golf-for-chats/` will need to be created
# once manually
STATIC_PATH = Path.home() / 'static'


@dataclass
class FileInfo:
    path: str = None
    filepath: Path = None
    content: bytes = None


@contextmanager
def save_file(file: Optional[UploadFile | bytes], name: str) -> ContextManager[FileInfo]:
    """Saves provided file and returns the full filepath"""

    name = name.lstrip('/').lower().replace(' ', '-')
    filepath = STATIC_PATH / name
    filepath.parent.mkdir(mode=0o777, parents=True, exist_ok=True)

    if isinstance(file, UploadFile):
        content = file.file.read()
    else:
        content = file

    try:
        if content is not None:
            with open(filepath, 'wb') as f:
                f.write(content)
            yield FileInfo(name, filepath, content)
        else:
            yield FileInfo()

    except Exception as e:
        logging.error(f"Error encountered when running operation with file saving, removing file\n{e}")
        os.remove(filepath)
        raise e


def get_static_file_url(request: Request, file_info: str | FileInfo):
    if isinstance(file_info, FileInfo):
        path = file_info.path
    else:
        path = file_info

    return str(request.base_url).rstrip('/') + '/static/' + path.lstrip('/')
