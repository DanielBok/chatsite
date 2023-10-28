import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import React, { createContext, PropsWithChildren, useContext } from "react";

type AlbumContentType = {
  contents: ContentInfo[]
}


const AlbumContext = createContext<AlbumContentType>({
  contents: [],
});

export const AlbumContextProvider = ({contents, children}: PropsWithChildren<AlbumContentType>) => (
  <AlbumContext.Provider value={{contents}}>
    {children}
  </AlbumContext.Provider>
);

export const useAlbumContext = () => useContext(AlbumContext);
