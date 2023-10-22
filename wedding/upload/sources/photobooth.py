from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from tqdm import tqdm

from libs import s3_client, upload


def upload_360_videos(photo_folder: str = r"C:\Users\danie\Downloads\wedding\Bali\360"):
    folder = Path(photo_folder)

    with ThreadPoolExecutor() as pool, s3_client() as client:
        futures = []
        for p in folder.iterdir():
            if p.is_file():
                names = p.name.split(' ')[-1].split('.', maxsplit=1)
                name = names[0] + '.' + names[1].lower()
                key = f'wedding/bali/360/{name}'

                match key.split('.')[-1]:
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
