import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React, { createContext, PropsWithChildren, useContext, useState } from "react";

type AlbumContentType = {
  contents: ContentInfo[]
  index: number
  setIndex: (x: number) => void
}


const AlbumContext = createContext<AlbumContentType>({
  contents: [],
  index: -1,
  setIndex: () => {
  }
});

export const useAlbumContext = () => useContext(AlbumContext);

export default function AlbumContextProvider({
                                               contents,
                                               children
                                             }: PropsWithChildren<Pick<AlbumContentType, "contents">>) {
  const [index, setIndex] = useState(-1);

  return (
    <AlbumContext.Provider value={{contents, index, setIndex}}>
      {children}
    </AlbumContext.Provider>
  );
}
