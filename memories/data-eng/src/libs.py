import os
from contextlib import contextmanager
from pathlib import Path
from typing import ContextManager

from mypy_boto3_s3 import S3Client
from tqdm import tqdm

BUCKET = 'chatsite'
ORIGIN = f'https://{BUCKET}.sgp1.digitaloceanspaces.com'


def _load_do_env_vars():
    keys = {'DO_SPACES_ACCESS_ID', 'DO_SPACES_SECRET_KEY'}
    missing = keys - os.environ.keys()
    if len(missing) > 0:
        env_file = Path(__file__).parents[1] / '.env'
        if env_file.exists():
            with open(env_file) as f:
                env_vars = dict([line.split('=', 1) for line in f.read().strip().split('\n')])

            for k, v in env_vars.items():
                os.environ.setdefault(k, v)


@contextmanager
def s3_client() -> ContextManager[S3Client]:
    client = create_s3_client()
    yield client
    client.close()


def create_s3_client() -> S3Client:
    from boto3.session import Session
    from botocore.config import Config

    _load_do_env_vars()

    session = Session()
    client = session.client('s3',
                            endpoint_url="https://sgp1.digitaloceanspaces.com",
                            config=Config(s3={'addressing_style': 'virtual'}),
                            region_name='sgp1',
                            aws_access_key_id=os.environ['DO_SPACES_ACCESS_ID'],
                            aws_secret_access_key=os.environ['DO_SPACES_SECRET_KEY'])

    return client


def upload(key: str, client: S3Client, filepath: Path, content_type: str):
    with open(filepath, mode='rb') as f:
        res = client.put_object(
            Bucket=BUCKET,
            Key=key,
            Body=f.read(),
            ACL="public-read",
            ContentType=content_type,
        )

    if res['ResponseMetadata']['HTTPStatusCode'] == 200:
        return 0
    else:
        raise RuntimeError(res)


def remove_objects(prefix='wedding-thumbnails/'):
    if len(prefix) < 1 or '/' not in prefix:
        raise RuntimeError("You're in danger of removing all the contents in the bucket!")

    with s3_client() as client:
        items = client.list_objects_v2(Bucket=BUCKET, Prefix=prefix)['Contents']
        for item in tqdm(items, desc=f"Removing from {prefix}"):
            client.delete_object(Bucket=BUCKET, Key=item["Key"])
