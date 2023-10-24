import { EventType } from "@/lib/pages";
import { notFound } from "next/navigation";
import React from "react";
import ContentManager from "./(components)/ContentManager";
import FilesLightbox from "./(components)/FilesLightbox";
import Header from "./(components)/Header";


export default async function Page({params: {event}}: NextPageParams<{ event: string }>) {
  const evt = event.toLowerCase() as EventType;
  if (!["bali", "singapore", "pre-wedding"].includes(evt)) {
    return notFound();
  }

  return (
    <div className="flex flex-col bg-white">
      <Header event={evt}/>
      <div className="p-2 mt-2 flex flex-col items-center">
        <ContentManager event={evt} className="container bg-base-100">
          <FilesLightbox/>
        </ContentManager>
      </div>
    </div>
  );
}
