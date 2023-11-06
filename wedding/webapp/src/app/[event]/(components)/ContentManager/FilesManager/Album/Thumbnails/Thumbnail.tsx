import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import { Photo } from "react-photo-album";


type Props = Pick<ContentInfo, "contentType" | "dim"> & {
  photo: Photo
  onClick?: React.DOMAttributes<HTMLDivElement>["onClick"]
  body?: React.ReactNode
}

export default function Thumbnail({contentType, dim, photo, onClick, body}: Props) {
  return (
    <div
      onClick={onClick}
      className="card bg-neutral-100 shadow-xl mb-4 cursor-pointer hover:scale-105 transition duration-300"
    >
      <figure className={getFigureClass()}>
        <ThumbnailVisual photo={photo} dim={dim} contentType={contentType}/>
      </figure>
      {body && (
        <div className="card-body p-3 rounded-b-2xl">
          {body}
        </div>
      )}
    </div>
  );

  function getFigureClass() {
    if (!body) return "rounded-2xl";
    return "rounded-t-2xl";
  }
}

function ThumbnailVisual({contentType, dim, photo}: Pick<Props, "contentType" | "dim" | "photo">) {
  switch (contentType) {
    case "video": {
      return <video
        src={photo.src}
        onMouseOver={event => (event.target as HTMLVideoElement).play()}
        onMouseOut={event => (event.target as HTMLVideoElement).pause()}
        width={dim.width}
        height={dim.height}
        loop
        className="w-full"
      />;
    }
    case "image": {
      // eslint-disable-next-line @next/next/no-img-element
      return <img
        src={photo.src}
        alt={photo.alt!}
        width={dim.width}
        height={dim.height}
        className="w-full"
      />;
    }
  }
}
