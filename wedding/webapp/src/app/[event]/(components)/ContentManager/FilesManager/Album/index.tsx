"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import AlbumContextProvider from "../context";
import DownloadAlbum from "./DownloadAlbum";
import EditAlbum from "./EditAlbum";
import ViewAlbum from "./ViewAlbum";

type Props = {
  contents: ContentInfo[]
}

export default function Album({contents}: Props) {
  return (
    <AlbumContextProvider contents={contents}>
      <BaseAlbum/>
    </AlbumContextProvider>
  );
}

function BaseAlbum() {
  const {mode} = useContentManagerContext();

  switch (mode) {
    case "View":
      return <ViewAlbum/>;
    case "Download":
      return <DownloadAlbum/>;
    case "Edit":
      return <EditAlbum/>;
    default:
      return null;
  }
}