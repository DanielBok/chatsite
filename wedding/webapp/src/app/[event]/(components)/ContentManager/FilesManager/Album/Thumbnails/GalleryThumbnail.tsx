import classNames from "classnames";
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
    <div
      onClick={onClick}
      className={classNames("card bg-base-100 shadow-xl cursor-pointer mb-4",
        contentType === "video" ? "bg-indigo-200" : "bg-orange-200")}
    >
      <div className="card-body p-3">
        <figure>
          <Thumbnail photo={photo} dim={dim} contentType={contentType}/>
        </figure>
      </div>
    </div>
  );
}
