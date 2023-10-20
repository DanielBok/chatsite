import re
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from tqdm import tqdm

from sources._libs import s3_client, upload


def main(photo_folder: str = r"C:\Users\danie\Downloads\wedding\Singapore\kimnshin"):
    folder = Path(photo_folder)

    with ThreadPoolExecutor() as pool, s3_client() as client:
        futures = []
        for p in folder.iterdir():
            if p.is_file():
                index, name_hash = re.match('(\d+).*(\[\w+]\.\w+)', p.name).groups()
                key = f'wedding/singapore/kimnshin/{int(index):04d}-{name_hash}'
                ext = key.split('.')[-1]
                content_type = f"image/{'jpeg' if ext == 'jpg' else ext}"
                futures.append(pool.submit(upload,
                                           key=key,
                                           client=client,
                                           filepath=p,
                                           content_type=content_type))

        for _ in tqdm(as_completed(futures), total=len(futures), ncols=80):
            pass
