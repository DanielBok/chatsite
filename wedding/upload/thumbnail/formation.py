import io
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from PIL import Image
from tqdm import tqdm

from libs import s3_client


def main():
    contents = fetch_all_objects_metadata()
    with ThreadPoolExecutor(10) as pool:
        futures = [pool.submit(process_file, key=key)
                   for c in contents if (key := c['Key']).endswith('.jpg')]

        for _ in tqdm(as_completed(futures), total=len(futures), ncols=60):
            pass


def fetch_all_objects_metadata():
    with s3_client() as client:
        result = client.list_objects_v2(Bucket='chatsite', Prefix='wedding')
    contents = result['Contents']

    while result['IsTruncated']:
        result = client.list_objects_v2(
            Bucket='chatsite',
            Prefix='wedding',
            ContinuationToken=result['ContinuationToken'])
        contents.extend(result['Contents'])

    return contents


def process_file(key: str):
    if key.endswith('.jpg'):
        process_image(key)
    else:
        process_video(key)


def process_image(key):
    target_max = 300
    url = f"https://chatsite.sgp1.cdn.digitaloceanspaces.com/{key}"
    with io.BytesIO(requests.get(url).content) as data, Image.open(data) as img:
        width, height = img.size
        if height > width:
            width /= (height / target_max)
            height = target_max
        else:
            height /= (width / target_max)
            width = target_max

        img.thumbnail((width, height))
        upload_thumbnail(img, key, 'image/jpeg')


def process_video(key: str):
    raise NotImplementedError


def upload_thumbnail(img: Image, key: str, content_type: str):
    with s3_client() as client:
        res = client.put_object(
            Bucket='chatsite',
            Key=key.replace('wedding/', 'wedding-thumbnails/'),
            Body=img.tobytes(),
            ACL="public-read",
            ContentType=content_type,
        )

    if res['ResponseMetadata']['HTTPStatusCode'] != 200:
        raise RuntimeError(res)
