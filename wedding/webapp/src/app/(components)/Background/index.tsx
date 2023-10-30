import { cacheFetchContents } from "@/lib/s3";
import React from "react";
import ContentPlayer from "./ContentPlayer";

export default async function Background() {
  const videos = [
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/1.official/highlights.mp4",
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/pre-wedding/daniel-_and_-priscilla-connection-s_2023-05-31_1080p.mp4",
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/1.official/shorts.mp4"
  ];
  const images = (await cacheFetchContents())
    .filter(x => x.orientation === "portrait" && x.contentType === "image")
    .map(e => e.url);

  return <ContentPlayer videos={videos} images={images}/>;
}
