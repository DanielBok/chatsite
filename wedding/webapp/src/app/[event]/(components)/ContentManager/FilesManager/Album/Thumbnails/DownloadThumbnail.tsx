import classNames from "classnames";
import React from "react";
import { RenderPhotoProps } from "react-photo-album";
import { useAlbumContext } from "../../context/album";
import { useAlbumDownloadContext, useSubAlbumDownloadContext } from "../../context/download";
import Thumbnail from "./Thumbnail";


export default function DownloadThumbnail({
                                            photo,
                                            imageProps: {onClick},
                                          }: RenderPhotoProps) {
  const index = parseInt(photo.key!);
  const selected = useSubAlbumDownloadContext().selected.hasOwnProperty(index)
  const {contentType, dim} = useAlbumContext().contents[index];

  return (
    <div
      onClick={onClick}
      className={classNames("card bg-base-100 shadow-xl cursor-pointer mb-4",
        selected ? "bg-green-600" :
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
