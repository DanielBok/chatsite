import Information from "@/app/(components)/Information";
import React from "react";

export default function Home() {
  const links = [
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/official/IG.mp4",
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/official/wedding.mp4",
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/pre-wedding/slideshow.mp4",
  ];
  const link = links[Math.floor(Math.random() * links.length)];

  return (
    <main>
      <video
        src={link}
        className="h-screen w-screen bg-black absolute"
        autoPlay
        muted
        loop
      />
      <div className="w-screen h-screen absolute top-0 left-0 z-10">
        <Information/>
      </div>
    </main>
  );
}
