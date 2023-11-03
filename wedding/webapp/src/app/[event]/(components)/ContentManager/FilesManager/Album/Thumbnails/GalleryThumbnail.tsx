import React from "react";
import type { RenderPhotoProps } from "react-photo-album";
import { useAlbumContext } from "../../context";
import Thumbnail from "./Thumbnail";

export default function GalleryThumbnail({
                                           photo,
                                           imageProps: {onClick},
                                         }: RenderPhotoProps) {
  const {contentType, dim} = useAlbumContext().contents[parseInt(photo.key!) as number];

  return (
    <Thumbnail
      photo={photo}
      dim={dim}
      contentType={contentType}
      onClick={onClick}
    />
  );
}
