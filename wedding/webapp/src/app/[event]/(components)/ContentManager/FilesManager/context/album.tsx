import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React, { createContext, PropsWithChildren, useContext } from "react";

type AlbumContentType = {
  contents: ContentInfo[]
}


const AlbumContext = createContext<AlbumContentType>({
  contents: []
});

export const useAlbumContext = () => useContext(AlbumContext);

export default function AlbumContextProvider({
                                               contents,
                                               children
                                             }: PropsWithChildren<Pick<AlbumContentType, "contents">>) {
  return (
    <AlbumContext.Provider value={{contents}}>
      {children}
    </AlbumContext.Provider>
  );
}
