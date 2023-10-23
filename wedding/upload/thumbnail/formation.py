import io
import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
from tempfile import TemporaryDirectory

import cv2
import requests
from PIL import Image
from tqdm import tqdm

from libs import s3_client

BUCKET_URL = 'https://chatsite.sgp1.cdn.digitaloceanspaces.com'


def main():
    contents = fetch_all_objects_metadata()
    with ThreadPoolExecutor(10) as pool:
        futures = [pool.submit(process_file, key=key)
                   for c in contents
                   if (key := c['Key']).endswith('.mp4')]

        for _ in tqdm(as_completed(futures), total=len(futures), ncols=60):
            pass


def fetch_all_objects_metadata():
    with s3_client() as client:
        result = client.list_objects_v2(Bucket='chatsite', Prefix='wedding/')
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


def process_image(key, target_max=150):
    url = f"{BUCKET_URL}/{key}"

    with (io.BytesIO(requests.get(url).content) as data,
          Image.open(data) as img,
          io.BytesIO() as resized_io,
          s3_client() as client):
        width, height = img.size

        if height > width:
            width = int(width / height * target_max)
            height = target_max
        else:
            height = int(height / width * target_max)
            width = target_max

        resized = img.resize((width, height))
        resized.save(resized_io, format='JPEG')
        resized_io.seek(0)

        res = client.put_object(
            Bucket='chatsite',
            Key=re.sub('^wedding/', 'wedding-thumbnail/', key),
            Body=resized_io.read(),
            ACL="public-read",
            ContentType='image/jpeg',
        )

        if res['ResponseMetadata']['HTTPStatusCode'] != 200:
            raise RuntimeError(res)


def process_video(key: str, target_max=200):
    # key = 'wedding/bali/2-360/GX011244.mp4'
    url = f"{BUCKET_URL}/{key}"
    vcap = cv2.VideoCapture(url)
    try:
        frames = []
        count = 0
        fps = vcap.get(cv2.CAP_PROP_FPS)
        skip = 0
        while (src := vcap.read())[0]:
            if '/2-360/' in key:
                frame = src[1][500:1600, 100:1000]
            else:
                skip += 1
                if skip < 5 * fps:
                    continue

                frame = src[1]

            height, width, _ = frame.shape

            if height > width:
                width = int(width / height * target_max)
                height = target_max
            else:
                height = int(height / width * target_max)
                width = target_max

            frames.append(cv2.resize(frame, (width, height)))
            count += 1
            if count > fps * 5:
                break
    finally:
        vcap.release()

    with TemporaryDirectory(prefix='video') as tmp, s3_client() as client:
        fp = Path(tmp) / key.replace('/', '--')

        height, width, _ = frames[0].shape

        # this fourcc code is magic for mp4 which I found here
        # https://stackoverflow.com/a/47920385
        writer = cv2.VideoWriter(fp.as_posix(), 0x00000021, fps, (width, height))
        for frame in frames:
            writer.write(frame)

        writer.release()

        client.upload_file(Filename=fp.as_posix(),
                           Bucket='chatsite',
                           Key=re.sub('^wedding/', 'wedding-thumbnail/', key),
                           ExtraArgs={'ACL': "public-read", 'ContentType': 'video/mp4'})
