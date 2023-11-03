import { saveAs } from "file-saver";
import React from "react";
import { RenderPhotoProps } from "react-photo-album";
import { useAlbumContext } from "../../context";
import { cardClasses } from "./constants";
import Thumbnail from "./Thumbnail";


export default function DownloadThumbnail({photo}: RenderPhotoProps) {
  const index = parseInt(photo.key!);
  const {contentType, dim, url} = useAlbumContext().contents[index];

  return (
    <div className={cardClasses(contentType)} onClick={saveFile}>
      <div className="card-body p-3">
        <figure>
          <Thumbnail photo={photo} dim={dim} contentType={contentType}/>
        </figure>
      </div>
    </div>
  );

  function saveFile() {
    const filename = photo.src.split("/").slice(-1)[0];

    fetch(url.src)
      .then(response => response.blob())
      .then(blob => saveAs(blob, filename))
      .catch(e => console.error(e));
  }
}
