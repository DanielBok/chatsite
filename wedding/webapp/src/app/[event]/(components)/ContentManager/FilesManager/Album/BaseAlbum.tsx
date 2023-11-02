"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import React from "react";
import DownloadAlbum from "./DownloadAlbum";
import ViewAlbum from "./ViewAlbum";

export default function BaseAlbum() {
  const {mode} = useContentManagerContext();

  switch (mode) {
    case "View":
      return <ViewAlbum/>;
    case "Download":
      return <DownloadAlbum/>;
    default:
      return null;
  }

}