import React, { createContext, PropsWithChildren, useCallback, useContext, useState } from "react";


type AlbumDownloadType = {
  selected: Record<string, string>  // key: url, value: any
  setSelected: (v: AlbumDownloadType["selected"]) => void
}

const AlbumDownloadContext = createContext<AlbumDownloadType>({
  selected: {},
  setSelected: () => {
  }
});


export const useAlbumDownloadContext = () => useContext(AlbumDownloadContext);

export function AlbumDownloadContextProvider({children}: PropsWithChildren) {
  const [selected, setSelected] = useState<AlbumDownloadType["selected"]>({});

  return (
    <AlbumDownloadContext.Provider value={{selected, setSelected}}>
      {children}
    </AlbumDownloadContext.Provider>
  );
}

type SubAlbumDownloadType = {
  selected: Record<number, string>  // key: index, value: url
  setSelected: (v: Record<number, string>) => void
}

const SubAlbumDownloadContext = createContext<SubAlbumDownloadType>({
  selected: {},
  setSelected: () => {
  }
});


export const useSubAlbumDownloadContext = () => useContext(SubAlbumDownloadContext);

export function SubAlbumDownloadContextProvider({children}: PropsWithChildren) {
  const [selected, setSelected] = useState<Record<number, string>>({});

  return (
    <SubAlbumDownloadContext.Provider value={{selected, setSelected}}>
      {children}
    </SubAlbumDownloadContext.Provider>
  );
}