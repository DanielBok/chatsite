"use client";

import { pickRandom } from "@/lib/functools";
import React, { useEffect, useState } from "react";
import { useInterval } from "usehooks-ts";

type Props = {
  images: string[]
}


export default function ImageLoop({images}: Props) {
  const [image, setImage] = useState("");

  useEffect(setRandomImage, [images]);
  useInterval(setRandomImage, 5000);

  if (image === "") return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="Landing screen image"
      className="h-screen w-screen bg-black absolute md:hidden object-contain"
    />
  );

  function setRandomImage() {
    setImage(pickRandom(images));
  }
}
