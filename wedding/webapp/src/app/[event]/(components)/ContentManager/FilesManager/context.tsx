import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

type AlbumContentType = {
  contents: ContentInfo[]
  updateContent: (c: ContentInfo) => void
}


const AlbumContext = createContext<AlbumContentType>({
  contents: [],
  updateContent: () => {
  }
});

export const useAlbumContext = () => useContext(AlbumContext);

export default function AlbumContextProvider({
                                               contents: _contents,
                                               children
                                             }: PropsWithChildren<Pick<AlbumContentType, "contents">>) {
  const [contents, setContents] = useState(_contents);

  return (
    <AlbumContext.Provider value={{contents, updateContent}}>
      {children}
    </AlbumContext.Provider>
  );

  function updateContent(c: ContentInfo) {
    setContents(contents.map(e => e.key === c.key ? c : e));
  }
}
