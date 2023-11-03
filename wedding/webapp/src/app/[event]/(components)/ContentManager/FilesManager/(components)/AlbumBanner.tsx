"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import React from "react";


export default function AlbumBanner() {
  const {mode} = useContentManagerContext();

  return (
    <div className="my-6 rounded p-4 bg-emerald-500 text-white text-lg">
      {message()}
    </div>
  );

  function message() {
    switch (mode) {
      case "Download":
        return "Select any thumbnails to download the actual picture.";
      case "View":
        return "Select any thumbnails to view the picture in greater detail.";
      case "Edit":
        return "Select any thumbnails to edit the tags on the pictures.";
    }
  }
}
