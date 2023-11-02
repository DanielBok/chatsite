"use client";

import React from "react";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import { Download, Fullscreen, Share, Video } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/styles.css";
import { useAlbumContext } from "./context";

export default function ViewAlbum() {
  const {contents, index, setIndex} = useAlbumContext();

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
    <Lightbox
      index={index}
      slides={slides}
      open={index >= 0}
      close={() => setIndex(-1)}
      plugins={[Download, Fullscreen, Share, Video]}
    />
  );
}
