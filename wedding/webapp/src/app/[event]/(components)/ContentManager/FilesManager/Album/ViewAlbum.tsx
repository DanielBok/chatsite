"use client";

import { useAlbumContext } from "@/app/[event]/(components)/ContentManager/FilesManager/context";
import GalleryThumbnail from "./Thumbnails/GalleryThumbnail";
import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import { Download, Fullscreen, Share, Video } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";

export default function ViewAlbum() {
  const [index, setIndex] = useState(-1)
  const {contents, } = useAlbumContext();

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
    <>
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

    </>
  );
}
