import React from "react";
import PhotoAlbum from "react-photo-album";
import { useAlbumContext } from "../context";
import DownloadThumbnail from "./Thumbnails/DownloadThumbnail";


export default function DownloadAlbum() {
  const {contents} = useAlbumContext();

  const photos = contents.map(({url, key, dim}, index) => ({
    key: index.toFixed(),
    src: url.thumbnail,
    alt: key,
    ...dim,
  }));

  return (
    <PhotoAlbum
      layout="masonry"
      photos={photos}
      spacing={10}
      renderPhoto={DownloadThumbnail}
    />
  );
}
