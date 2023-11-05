import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AlbumContentType = {
  contents: ContentInfo[]
  setContents: (contents: ContentInfo[]) => void
  updateContent: (c: ContentInfo) => void
}


const AlbumContext = createContext<AlbumContentType>({
  contents: [],
  setContents: () => {
  },
  updateContent: () => {
  }
});

export const useAlbumContext = () => useContext(AlbumContext);

export default function AlbumContextProvider({
                                               contents: items,
                                               children
                                             }: PropsWithChildren<Pick<AlbumContentType, "contents">>) {
  const [contents, setContents] = useState<ContentInfo[]>([]);

  useEffect(() => {
    setContents(items);
  }, [items]);

  return (
    <AlbumContext.Provider value={{contents, setContents, updateContent}}>
      {children}
    </AlbumContext.Provider>
  );

  function updateContent(c: ContentInfo) {
    setContents(contents.map(e => e.key === c.key ? c : e));
  }
}
