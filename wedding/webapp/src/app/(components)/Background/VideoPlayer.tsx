"use client";

import { pickRandom } from "@/lib/functools";
import React, { useState } from "react";


type Props = {
  videos: string[];
}

export default function VideoPlayer({videos}: Props) {
  const [video, setVideo] = useState(pickRandom(videos));
  return (
    <video
      src={video}
      onEnded={() => setVideo(pickRandom(videos.filter(v => v !== video)))}
      className="h-screen w-screen bg-black absolute md:absolute"
      autoPlay
      muted
      loop
    />
  );
}
