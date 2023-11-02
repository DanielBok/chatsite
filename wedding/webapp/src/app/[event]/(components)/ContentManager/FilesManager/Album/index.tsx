"use client";

import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import BaseAlbum from "./BaseAlbum";
import AlbumContextProvider from "./context";


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
