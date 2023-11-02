from concurrent.futures import ThreadPoolExecutor, as_completed
from io import BytesIO

import cv2
import requests
from PIL import Image
from tqdm import tqdm

from src.libs import ORIGIN, s3_client, BUCKET


def replace_all_files_metadata():
    keys = []
    with s3_client() as client:
        for prefix in ['memories/wedding/',
                       'memories/wedding-thumbnails/']:
            token = ''
            while True:
                result = client.list_objects_v2(Bucket=BUCKET, Prefix=prefix, ContinuationToken=token)
                keys.extend([x['Key'] for x in result['Contents']])

                if result['IsTruncated']:
                    token = result['NextContinuationToken']
                else:
                    break

    with ThreadPoolExecutor() as pool:
        futures = [pool.submit(replace_file_metadata, key=key) for key in keys]

        for _ in tqdm(as_completed(futures), total=len(futures), ncols=80):
            pass


def replace_file_metadata(key: str):
    with s3_client() as client:
        meta = client.head_object(Bucket=BUCKET, Key=key)
        content_type = meta['ContentType']

        if not (content_type.startswith('video') or content_type.startswith('image')):
            if key.endswith('.jpg'):
                content_type = 'image/jpeg'
            elif key.endswith('.mp4'):
                content_type = 'video/mp4'

        url = f"{ORIGIN}/{key}"
        if content_type == 'image/jpeg':
            resp = requests.get(url)
            resp.raise_for_status()

            with requests.get(f'{ORIGIN}/{key}') as resp:
                resp.raise_for_status()

                with BytesIO(resp.content) as bio, Image.open(bio) as img:
                    width, height = img.size

        elif content_type == 'video/mp4':
            capture = cv2.VideoCapture(url)
            try:
                done, frame = capture.read()
                assert done, f"could not fetch video from {url}"

                height, width, _ = frame.shape
            finally:
                capture.release()

        else:
            raise NotImplementedError(f"Have not implemented replacement procedure for content-type='{content_type}'")

        if key.startswith('wedding-thumbnails'):
            subkey, _, ext = key.rsplit('.', 2)
            target_key = f'memories/{subkey}.{ext}'
        else:
            target_key = f'memories/{key}'

        client.copy_object(Bucket=BUCKET,
                           Key=target_key,
                           CopySource={'Bucket': BUCKET, 'Key': key},
                           ACL='public-read',
                           Metadata={'width': str(width), 'height': str(height)},
                           MetadataDirective='REPLACE',
                           ContentType=content_type)


if __name__ == '__main__':
    replace_all_files_metadata()
