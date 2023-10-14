import os
from contextlib import contextmanager
from typing import Optional, ContextManager

from mypy_boto3_s3.client import S3Client
from starlette.datastructures import UploadFile


def _get_endpoint(bucket: str = None, path: str = None):
    if bucket is None:
        return "https://sgp1.digitaloceanspaces.com"
    else:
        url = f"https://{bucket}.sgp1.digitaloceanspaces.com"
        return f"{url}/{path}" if isinstance(path, str) else url


@contextmanager
def _s3_client() -> ContextManager[S3Client]:
    from boto3.session import Session
    from botocore.config import Config

    session = Session()
    client = session.client('s3',
                            endpoint_url=_get_endpoint(),
                            config=Config(s3={'addressing_style': 'virtual'}),
                            region_name='sgp1',
                            aws_access_key_id=os.environ['DO_SPACES_ACCESS_ID'],
                            aws_secret_access_key=os.environ['DO_SPACES_SECRET_KEY'])

    yield client

    client.close()


@contextmanager
def save_file(file: Optional[UploadFile | bytes], name: str) -> ContextManager[Optional[str]]:
    """Saves provided file and returns the full filepath"""

    name = name.lstrip('/').lower().replace(' ', '-')
    if isinstance(file, UploadFile):
        content = file.file.read()
    else:
        content = file

    if content is not None:
        with _s3_client() as client:
            res = client.put_object(
                Bucket="chatsite",
                Key=name,
                Body=content,
                ACL="public-read")

        if res['ResponseMetadata']['HTTPStatusCode'] == 200:
            yield _get_endpoint('chatsite', name)
        else:
            raise RuntimeError("An error occurred while attempting to upload a file to the 'chatsite' bucket")
    else:
        yield None
