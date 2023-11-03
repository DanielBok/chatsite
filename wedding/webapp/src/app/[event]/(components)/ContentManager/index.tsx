import { EventType } from "@/lib/pages";
import React from "react";
import ContentManagerContextProvider from "./context";
import FilesManager from "./FilesManager";
import ModeSelector from "./FilesManager/(components)/ModeSelector";
import Tracker from "./FilesManager/(components)/Tracker";
import AlbumBanner from "./FilesManager/(components)/AlbumBanner";

type Props = {
  event: EventType
}

export default function ContentManager({event}: Props) {
  return (
    <ContentManagerContextProvider event={event}>
      <div className="container bg-base-100">
        <AlbumBanner/>

        <Tracker>
          <FilesManager/>
        </Tracker>
        <ModeSelector/>
      </div>
    </ContentManagerContextProvider>
  );
}
