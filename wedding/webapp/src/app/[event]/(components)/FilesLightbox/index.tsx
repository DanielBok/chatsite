"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import React from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox, { Slide } from "yet-another-react-lightbox";
import Download from "yet-another-react-lightbox/plugins/download";
import Share from "yet-another-react-lightbox/plugins/share";
import Video from "yet-another-react-lightbox/plugins/video";
import "yet-another-react-lightbox/styles.css";
import GalleryThumbnail from "./GalleryThumbnail";

export default function FilesLightbox() {
  const {
    contents
  } = useContentManagerContext();
  const [index, setIndex] = React.useState(-1);

  const contentList = Object.values(contents);
  const photos = contentList.map(({url, dim}, index) => ({
    src: url.thumbnail,
    alt: index.toFixed(),
    ...dim,
  }));

  const slides: Slide[] = contentList
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
    <div className="container">
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