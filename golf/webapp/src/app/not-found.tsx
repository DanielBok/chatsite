import Image from "next/image";
import React from "react";
import NotFound1 from "../static/errors/error-404.webp";
import NotFound2 from "../static/errors/page-not-found.webp";

const IMAGES = [NotFound1, NotFound2];

export default function NotFound() {
  const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];

  return (
    <div className="flex flex-col items-center">
      <Image src={image} alt="Not found" width={675} height={450}/>
      <div className="text-lg">
        <p>
          Unfortunately, the page you're heading to doesn't exist.
        </p>
        <p>
          If this is unexpected, please call <span className="text-blue-400">Monkey Chat</span>.
        </p>
      </div>
    </div>
  );
}
