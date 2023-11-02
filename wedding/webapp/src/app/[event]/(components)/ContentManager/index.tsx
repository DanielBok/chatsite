import { EventType } from "@/lib/pages";
import React from "react";
import ContentManagerContextProvider from "./context";
import FilesManager from "./FilesManager";
import ModeSelector from "./ModeSelector";
import Tracker from "./Tracker";

type Props = {
  event: EventType
}

export default function ContentManager({event}: Props) {
  return (
    <ContentManagerContextProvider event={event}>
      <div className="container bg-base-100">
        <Tracker>
          <FilesManager/>
        </Tracker>
        <ModeSelector/>
      </div>
    </ContentManagerContextProvider>
  );
}
