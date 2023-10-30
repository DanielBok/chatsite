"use client";

import { pickRandom } from "@/lib/functools";
import React, { useState } from "react";
import { useInterval } from "usehooks-ts";

type Props = {
  images: string[]
}


export default function ImageLoop({images}: Props) {
  const [image, setImage] = useState(pickRandom(images));

  useInterval(() => {
    setImage(pickRandom(images));
  }, 5000);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image}
      alt="Landing screen image"
      className="h-screen w-screen bg-black absolute md:hidden object-contain"
    />
  );
}
