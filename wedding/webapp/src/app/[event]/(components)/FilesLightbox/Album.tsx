"use client";

import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import GalleryThumbnail from "@/app/[event]/(components)/FilesLightbox/GalleryThumbnail";
import React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";

type Props = {
  contents: ContentInfo[]
}

export default function Album({contents}: Props) {
  const [index, setIndex] = React.useState(-1);

  const photos = contents.map(({url, dim}, index) => ({
    src: url.thumbnail,
    alt: index.toFixed(),
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
    <div>
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
        plugins={[Download, Share, Video]}
      />
    </div>
  );
}
