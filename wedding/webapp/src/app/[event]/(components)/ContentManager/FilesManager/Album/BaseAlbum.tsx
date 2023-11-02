"use client";

import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import PhotoAlbum from "react-photo-album";
import AlbumContextProvider, { useAlbumContext } from "./context";
import GalleryThumbnail from "./GalleryThumbnail";

type Props = React.PropsWithChildren<{
  contents: ContentInfo[]
}>

export default function BaseAlbum({contents, children}: Props) {
  return (
    <AlbumContextProvider contents={contents}>
      <ThumbnailAlbum/>
      {children}
    </AlbumContextProvider>
  );
}

const ThumbnailAlbum = () => {
  const {contents, setIndex} = useAlbumContext();

  const photos = contents.map(({url, key, dim}, index) => ({
    key: index.toFixed(),
    src: url.thumbnail,
    alt: key,
    ...dim,
  }));

  return (
    <PhotoAlbum
      layout="masonry"
      photos={photos}
      spacing={10}
      renderPhoto={GalleryThumbnail}
      onClick={({index: current}) => setIndex(current)}
    />);
};