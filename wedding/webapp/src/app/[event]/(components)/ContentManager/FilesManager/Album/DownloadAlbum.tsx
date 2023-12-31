import React from "react";
import PhotoAlbum from "react-photo-album";
import { useAlbumContext } from "../context";
import DownloadThumbnail from "./Thumbnails/DownloadThumbnail";
import { contentsToPhotos, PHOTO_ALBUM_SPACING, photoAlbumColumns } from "./utils";

export default function DownloadAlbum() {
  const photos = contentsToPhotos(useAlbumContext().contents);

  return (
    <PhotoAlbum
      layout="masonry"
      photos={photos}
      spacing={PHOTO_ALBUM_SPACING}
      columns={photoAlbumColumns}
      renderPhoto={DownloadThumbnail}
    />
  );
}
