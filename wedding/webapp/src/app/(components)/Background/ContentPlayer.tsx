"use client";

import React from "react";
import { useWindowSize } from "usehooks-ts";
import ImageLoop from "./ImageLoop";
import VideoPlayer from "./VideoPlayer";


type Props = Parameters<typeof ImageLoop>[0] & Parameters<typeof VideoPlayer>[0]

export default function ContentPlayer({images, videos}: Props) {
  const {width} = useWindowSize();

  if (width <= 520) {
    return <ImageLoop images={images}/>;
  } else {
    return <VideoPlayer videos={videos}/>;
  }
}