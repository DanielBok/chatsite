"use client";

import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import AlbumContextProvider from "../context";
import BaseAlbum from "./BaseAlbum";


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
