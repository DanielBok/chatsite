import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import { Photo } from "react-photo-album";

export function contentsToPhotos(contents: ContentInfo[]): Photo[] {
  return contents.map(({url, key, dim}, index) => ({
    key: index.toFixed(),
    src: url.thumbnail,
    alt: key,
    ...dim,
  }));
}

export function photoAlbumColumns(width: number) {
  if (width >= 1200) return 5;
  if (width >= 750 && width < 1200) return 4;
  if (width >= 450 && width < 750) return 3;
  if (width >= 225 && width < 450) return 2;
  return 1;
}

export const PHOTO_ALBUM_SPACING = 15;
