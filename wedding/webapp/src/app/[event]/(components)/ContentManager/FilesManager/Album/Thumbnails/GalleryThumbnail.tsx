import React from "react";
import type { RenderPhotoProps } from "react-photo-album";
import { useAlbumContext } from "../../context";
import { cardClasses } from "./constants";
import Thumbnail from "./Thumbnail";

export default function GalleryThumbnail({
                                           photo,
                                           imageProps: {onClick},
                                         }: RenderPhotoProps) {
  const {contentType, dim} = useAlbumContext().contents[parseInt(photo.key!) as number];

  return (
    <div onClick={onClick} className={cardClasses(contentType)}>
      <div className="card-body p-3">
        <figure>
          <Thumbnail photo={photo} dim={dim} contentType={contentType}/>
        </figure>
      </div>
    </div>
  );
}
