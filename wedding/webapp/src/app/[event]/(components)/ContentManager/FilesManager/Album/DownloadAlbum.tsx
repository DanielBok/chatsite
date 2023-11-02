import classNames from "classnames";
import React from "react";
import PhotoAlbum from "react-photo-album";
import { useAlbumContext } from "../context/album";
import {
  SubAlbumDownloadContextProvider,
  useAlbumDownloadContext,
  useSubAlbumDownloadContext,
} from "../context/download";
import DownloadThumbnail from "./Thumbnails/DownloadThumbnail";


export default function DownloadAlbum() {
  return (
    <SubAlbumDownloadContextProvider>
      <Album/>
      <DownloadPanel/>
    </SubAlbumDownloadContextProvider>
  );
}

const Album = () => {
  const albumCtx = useAlbumDownloadContext();
  const subAlbumCtx = useSubAlbumDownloadContext();
  const {contents} = useAlbumContext();

  const photos = contents.map(({url, key, dim}, index) => ({
    key: index.toFixed(),
    src: url.thumbnail,
    alt: key,
    ...dim,
  }));

  return (
    <PhotoAlbum
      layout="masonry"
      photos={photos}
      spacing={10}
      renderPhoto={DownloadThumbnail}
      onClick={({photo: {src}, index}) => {
        updateSubCtx(index, src);
        updateCtx(src);
      }}
    />
  );

  function updateSubCtx(index: number, src: string) {
    const {selected, setSelected} = subAlbumCtx;
    if (selected.hasOwnProperty(index)) {
      const {[index]: _, ...rest} = selected;
      setSelected(rest);
    } else {
      setSelected({...selected, [index]: src});
    }
  }

  function updateCtx(src: string) {
    const {selected, setSelected} = albumCtx;
    if (selected.hasOwnProperty(src)) {
      const {[src]: _, ...rest} = selected;
      setSelected(rest);
    } else {
      setSelected({...selected, [src]: ""});
    }
  }
};

const DownloadPanel = () => {
  const {selected} = useAlbumDownloadContext();
  const n = Object.keys(selected).length;
  const hasSelections = n === 0;

  return (
    <div className="w-full fixed left-0 bottom-4">
      <div className="flex justify-center items-center w-full">
        <div
          className={classNames("min-h-12 max-w-md min-w-[320px] rounded cursor-pointer flex justify-center items-center",
            hasSelections
              ? "bg-gray-300"
              : "bg-emerald-600")
          }>
          <span className={classNames(hasSelections ? "text-black" : "text-white", "p-2")}>
            {hasSelections
              ? "No pictures selected"
              : `Download ${n} item${n > 1 ? "s" : ""}`}
          </span>
        </div>
      </div>
    </div>
  );
};