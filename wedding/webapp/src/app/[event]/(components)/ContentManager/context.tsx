"use client";

import { EventType } from "@/lib/pages";
import React, { createContext, useContext, useState } from "react";
import { ContentManagerContextDataType, ContentManagerContextType } from "./types";


const ContentManagerContext = createContext<ContentManagerContextType>({
  contents: [],
  hasMore: true,
  updateContent: () => {
  }
});


export default function ContentManagerContextProvider({event, children}: React.PropsWithChildren<{
  event: EventType
}>) {
  const [data, setData] = useState<ContentManagerContextDataType>({
    contents: [],
    hasMore: true,
  });

  return (
    <ContentManagerContext.Provider value={{...data, updateContent, event}}>
      {children}
    </ContentManagerContext.Provider>
  );

  function updateContent({contents, hasMore, continuationToken}: ContentManagerContextDataType) {
    setData(prev => {
      return {
        contents: [...prev.contents, ...contents],
        hasMore,
        continuationToken,
      };
    });
  }
}

export const useContentManagerContext = () => useContext(ContentManagerContext);