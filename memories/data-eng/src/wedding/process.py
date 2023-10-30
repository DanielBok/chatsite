import io
import re
import shutil
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import cv2
from PIL import Image
from tqdm import tqdm

from src.libs import s3_client, BUCKET

DOWNLOADS_FOLDER = Path.home() / 'Downloads'
WEDDINGS_FOLDER = DOWNLOADS_FOLDER / 'wedding'
PROCESSED_FOLDER = DOWNLOADS_FOLDER / 'wedding-processed'
PROCESSED_SOURCE_FOLDER = PROCESSED_FOLDER / 'src'
THUMBNAILS_FOLDER = PROCESSED_FOLDER / 'thumbnails'
MAX_DIM_SIZE = 300  # pixels on the largest side


def process_entire_folder():
    if not WEDDINGS_FOLDER.exists():
        raise RuntimeError("You must load all the images into this folder to continue")

    THUMBNAILS_FOLDER.mkdir(exist_ok=True, parents=True)
    PROCESSED_SOURCE_FOLDER.mkdir(exist_ok=True, parents=True)
    move_and_upload_all_files()
    create_thumbnails_all_files()


def move_and_upload_all_files():
    print("Copying over raw files to processed folder")
    shutil.rmtree(PROCESSED_SOURCE_FOLDER)
    shutil.copytree(WEDDINGS_FOLDER, PROCESSED_SOURCE_FOLDER, dirs_exist_ok=True)

    print("Renaming file names")
    with ThreadPoolExecutor() as pool:
        futures = []
        for path in PROCESSED_SOURCE_FOLDER.rglob('*'):
            if path.is_file():
                new_name = re.sub(
                    pattern='-{2,}',
                    repl='-',
                    string=re.sub(
                        pattern='([^A-Za-z0-9-_.]|\s)',
                        repl='-',
                        string=re.sub(
                            pattern='[]\[){}]',
                            repl='',
                            string=path.name.lower())
                    )
                )

                new_path = path.parent / new_name
                path.rename(new_path)
                futures.append(pool.submit(_upload_original_file, new_path))

        for _ in tqdm(as_completed(futures), desc="Upload", total=len(futures)):
            pass


def _upload_original_file(fp: Path):
    content_type, width, height = _get_original_file_metadata(fp)

    with s3_client() as client:
        client.upload_file(
            Filename=fp.as_posix(),
            Bucket=BUCKET,
            Key='/'.join(['memories/wedding', fp.relative_to(PROCESSED_SOURCE_FOLDER).as_posix()]),
            ExtraArgs={'ACL': "public-read",
                       'ContentType': content_type,
                       'Metadata': {'width': str(width), 'height': str(height)}})


def _get_original_file_metadata(fp: Path):
    if fp.name.endswith('.mp4'):
        content_type = 'video/mp4'
        capture = cv2.VideoCapture(fp.as_posix())
        try:
            done, frame = capture.read()
            assert done, "could not read video frame"
            height, width, _ = frame.shape
        finally:
            capture.release()

    elif fp.name.endswith('.jpg'):
        content_type = 'image/jpeg'
        with Image.open(fp) as img:
            width, height = img.size

    else:
        raise TypeError(f"Invalid file extension '{fp.name}'. Only jpg and mp4 files are handled now")

    return content_type, width, height


def create_thumbnails_all_files():
    with ThreadPoolExecutor() as pool:
        futures = []
        for fp in PROCESSED_SOURCE_FOLDER.rglob('*'):
            if fp.is_file():
                futures.append(pool.submit(_create_thumbnail, fp))

        for _ in tqdm(as_completed(futures), desc="Thumbnails", total=len(futures)):
            pass


def _create_thumbnail(fp: Path):
    if fp.name.endswith('.mp4'):
        _create_video_thumbnail(fp)
    elif fp.name.endswith('.jpg'):
        _create_image_thumbnail(fp)
    else:
        raise TypeError(f"Invalid file extension '{fp.name}'. Only jpg and mp4 files are handled now")


def _form_thumbnail_filepath(fp: Path, width: int, height: int):
    assert width > 0 and height > 0, "invalid width and/or height value"
    return THUMBNAILS_FOLDER / fp.parent.relative_to(PROCESSED_SOURCE_FOLDER) / fp.name


def _create_image_thumbnail(fp: Path):
    with (Image.open(fp) as img,
          io.BytesIO() as resized_io,
          s3_client() as client):

        width, height = img.size

        if height > width:
            width = int(width / height * MAX_DIM_SIZE)
            height = MAX_DIM_SIZE
        else:
            height = int(height / width * MAX_DIM_SIZE)
            width = MAX_DIM_SIZE

        resized = img.resize((width, height))
        resized.save(resized_io, format='JPEG')
        resized_io.seek(0)

        new_fp = _form_thumbnail_filepath(fp, width, height)
        res = client.put_object(
            Bucket='chatsite',
            Key='/'.join(['memories/wedding-thumbnails', new_fp.relative_to(THUMBNAILS_FOLDER).as_posix()]),
            Body=resized_io.read(),
            ACL="public-read",
            ContentType='image/jpeg',
            Metadata={'width': str(width), 'height': str(height)}
        )

        if res['ResponseMetadata']['HTTPStatusCode'] != 200:
            raise RuntimeError(res)


def _create_video_thumbnail(fp: Path):
    path = fp.as_posix()
    vcap = cv2.VideoCapture(path)

    # read and resize frames
    try:
        frames = []
        count = 0
        fps = vcap.get(cv2.CAP_PROP_FPS)
        skip = 0

        width, height = 0, 0
        while (src := vcap.read())[0]:
            if '/2-360/' in path:
                frame = src[1][500:1600, 100:1000]
            else:
                skip += 1
                if skip < 5 * fps:
                    continue

                frame = src[1]

            height, width, _ = frame.shape

            if height > width:
                width = int(width / height * MAX_DIM_SIZE)
                height = MAX_DIM_SIZE
            else:
                height = int(height / width * MAX_DIM_SIZE)
                width = MAX_DIM_SIZE

            frames.append(cv2.resize(frame, (width, height)))
            count += 1
            if count > fps * 5:
                break
    finally:
        vcap.release()

    new_fp = _form_thumbnail_filepath(fp, width, height)
    new_fp.parent.mkdir(parents=True, exist_ok=True)

    # this fourcc code is magic for mp4 which I found here
    # https://stackoverflow.com/a/47920385
    writer = cv2.VideoWriter(new_fp.as_posix(), 0x00000021, fps, (width, height))
    for frame in frames:
        writer.write(frame)
    writer.release()

    with s3_client() as client:
        client.upload_file(
            Filename=new_fp.as_posix(),
            Bucket=BUCKET,
            Key='/'.join(['memories/wedding-thumbnails', new_fp.relative_to(THUMBNAILS_FOLDER).as_posix()]),
            ExtraArgs={'ACL': "public-read",
                       'ContentType': 'video/mp4',
                       'Metadata': {'width': str(width), 'height': str(height)}})
