import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import { Photo } from "react-photo-album";


type Props = Pick<ContentInfo, "contentType" | "dim"> & { photo: Photo }

export default function Thumbnail({contentType, dim, photo}: Props) {
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
