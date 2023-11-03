import EditThumbnail from "./Thumbnails/EditThumbnail";
import React from "react";
import PhotoAlbum from "react-photo-album";
import { useAlbumContext } from "../context";
import { contentsToPhotos, PHOTO_ALBUM_SPACING, photoAlbumColumns } from "./utils";


export default function EditAlbum() {
  const photos = contentsToPhotos(useAlbumContext().contents);

  return (
    <PhotoAlbum
      layout="masonry"
      photos={photos}
      spacing={PHOTO_ALBUM_SPACING}
      columns={photoAlbumColumns}
      renderPhoto={EditThumbnail}
    />
  );
}
