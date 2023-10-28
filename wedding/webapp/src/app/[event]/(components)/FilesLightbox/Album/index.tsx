"use client";

import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import GalleryThumbnail from "@/app/[event]/(components)/FilesLightbox/Album/GalleryThumbnail";
import React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import { Download, Fullscreen, Share, Video } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { AlbumContextProvider } from "./context";

type Props = {
  contents: ContentInfo[]
}

export default function Album({contents}: Props) {
  const [index, setIndex] = React.useState(-1);

  const photos = contents.map(({url, key, dim}, index) => ({
    key: index.toFixed(),
    src: url.thumbnail,
    alt: key,
    ...dim,
  }));

  const slides: Slide[] = contents
    .map(({url, contentType}, index) => {
      if (contentType === "video") {
        return {
          type: "video",
          autoPlay: true,
          loop: true,
          controls: true,
          sources: [{src: url.src, type: "video/mp4"}],
        } as Slide;
      } else {
        return {
          src: url.src,
          alt: index.toFixed(),
        } as Slide;
      }
    });


  return (
    <AlbumContextProvider contents={contents}>
      <PhotoAlbum
        layout="masonry"
        photos={photos}
        spacing={10}
        renderPhoto={GalleryThumbnail}
        onClick={({index: current}) => setIndex(current)}
      />

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        plugins={[Download, Fullscreen, Share, Video]}
      />
    </AlbumContextProvider>
  );
}
