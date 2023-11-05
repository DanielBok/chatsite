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
  },
  tagFilter: "",
  setTagFilter: () => {
  }
});


export default function ContentManagerContextProvider({event, children}: React.PropsWithChildren<{
  event: EventType
}>) {
  const [data, setData] = useState<ContentManagerContextDataType>({
    contents: [],
    hasMore: true,
  });
  const [mode, setMode] = useState<ContentManagerContextType["mode"]>("View");
  const [tagFilter, setTagFilter] = useState("");

  return (
    <ContentManagerContext.Provider value={
      {
        ...data,
        updateContent,
        event,
        mode,
        setMode,
        tagFilter,
        setTagFilter
      }
    }>
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
