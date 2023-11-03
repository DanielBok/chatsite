"use client";

import { EventType } from "@/lib/pages";
import React, { createContext, useContext, useState } from "react";
import { ContentManagerContextDataType, ContentManagerContextType } from "./types";


const ContentManagerContext = createContext<ContentManagerContextType>({
  mode: "View",
  contents: [],
  hasMore: true,
  updateContent: () => {
  },
  setMode: () => {
  }
});


export default function ContentManagerContextProvider({event, children}: React.PropsWithChildren<{
  event: EventType
}>) {
  const [data, setData] = useState<ContentManagerContextDataType>({
    contents: [],
    hasMore: true,
  });
  const [mode, setMode] = useState<ContentManagerContextType["mode"]>("Edit");

  return (
    <ContentManagerContext.Provider value={{...data, updateContent, event, mode, setMode}}>
      {children}
    </ContentManagerContext.Provider>
  );

  function updateContent({contents, hasMore, continuationToken}: ContentManagerContextDataType) {
    setData(prev => ({
      contents: [...prev.contents, ...contents],
      hasMore,
      continuationToken,
    }));
  }
}

export const useContentManagerContext = () => useContext(ContentManagerContext);
