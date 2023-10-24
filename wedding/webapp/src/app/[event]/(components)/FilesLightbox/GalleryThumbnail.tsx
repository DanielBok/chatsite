import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import type { Photo, RenderPhotoProps } from "react-photo-album";


export default function GalleryThumbnail({
                                           photo,
                                           imageProps: {onClick},
                                         }: RenderPhotoProps) {
  const index = parseInt(photo.alt!);

  const {contentType, dim} = useContentManagerContext().contents[index];

  return (
    <div className="card bg-base-100 shadow-xl cursor-pointer mb-4" onClick={onClick}>
      <div className="card-body p-3">
        <figure>
          <Content photo={photo} dim={dim} contentType={contentType}/>
        </figure>
      </div>
    </div>
  );
}

type ContentProps = Pick<ContentInfo, "contentType" | "dim"> & { photo: Photo }

function Content({contentType, dim, photo}: ContentProps) {
  switch (contentType) {
    case "video": {
      return <video
        src={photo.src}
        onMouseOver={event => (event.target as HTMLVideoElement).play()}
        onMouseOut={event => (event.target as HTMLVideoElement).pause()}
        width={dim.width}
        height={dim.height}
      />;
    }
    case "image": {
      // eslint-disable-next-line @next/next/no-img-element
      return <img
        src={photo.src}
        alt={photo.alt!}
        width={dim.width}
        height={dim.height}/>;
    }
  }
}