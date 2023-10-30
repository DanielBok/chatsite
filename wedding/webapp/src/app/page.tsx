import Background from "@/app/(components)/Background";
import Information from "@/app/(components)/Information";
import React from "react";

export default function Home() {
  const links = [
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/1.official/highlights.mp4",
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/pre-wedding/daniel-_and_-priscilla-connection-s_2023-05-31_1080p.mp4",
    "https://chatsite.sgp1.cdn.digitaloceanspaces.com/wedding/bali/1.official/shorts.mp4"
  ];
  const link = links[Math.floor(Math.random() * links.length)];

  return (
    <main>
      <Background/>
      <div className="w-screen h-screen absolute top-0 left-0 z-10">
        <Information/>
      </div>
    </main>
  );
}
