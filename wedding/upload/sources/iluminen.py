from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from tqdm import tqdm

from sources._libs import s3_client, upload


def upload_pre_wedding(photo_folder: str = r"C:\Users\danie\Downloads\wedding\Bali\pre-wedding"):
    _upload(photo_folder, prefix='wedding/bali/pre-wedding')


def upload_wedding(photo_folder: str = r"C:\Users\danie\Downloads\wedding\Bali\official"):
    _upload(photo_folder, prefix='wedding/bali/official')


def _upload(photo_folder: str, prefix: str):
    folder = Path(photo_folder)

    with ThreadPoolExecutor() as pool, s3_client() as client:
        futures = []
        for p in folder.iterdir():
            if p.is_file():
                name = p.name.split(' ')[-1]
                key = f'{prefix}/{name}'
                match key.split('.')[-1]:
                    case 'jpg' | 'jpeg':
                        content_type = 'image/jpeg'
                    case 'mp4':
                        content_type = 'video/mp4'
                    case _:
                        raise ValueError(f"Unhandled extension type: {key}")

                futures.append(pool.submit(upload,
                                           key=key,
                                           client=client,
                                           filepath=p,
                                           content_type=content_type))

        for _ in tqdm(as_completed(futures), total=len(futures), ncols=80):
            pass
