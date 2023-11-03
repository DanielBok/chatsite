import { useAlbumContext } from "@/app/[event]/(components)/ContentManager/FilesManager/context";
import { pickRandom } from "@/lib/functools";
import classNames from "classnames";
import React from "react";
import { RenderPhotoProps } from "react-photo-album";
import Thumbnail from "./Thumbnail";

const COLORS = [
  "bg-red-700",
  "bg-amber-700",
  "bg-emerald-700",
  "bg-blue-700",
  "bg-indigo-700",
  "bg-violet-700",
  "bg-pink-700"
];


export default function EditThumbnail({photo}: RenderPhotoProps) {
  const index = parseInt(photo.key!);
  const {contentType, dim, tags: _} = useAlbumContext().contents[index];

  const tags = ["tag 1", "tag 2"];
  const colors = tags.reduce((acc) => {
    if (acc.length === 0) {
      return [pickRandom(COLORS)];
    }
    const last = acc[acc.length - 1];

    while (true) {
      const color = pickRandom(COLORS);
      if (color !== last) {
        acc.push(color);
        return acc;
      }
    }
  }, [] as string[]);


  return (
    <Thumbnail
      photo={photo}
      dim={dim}
      contentType={contentType}
      body={tags.length > 0
        ? (
          <div className="flex flex-wrap">
            {tags.map((tag, index) => (
              <span
                key={`${tag}-${photo.src}`}
                className={classNames("items-center text-white justify-center " +
                  "rounded-full mr-1 mb-1 py-1.5 px-3 text-xs",
                  colors[index])}>
            {tag}
          </span>
            ))}
          </div>
        )
        : null
      }
    />
  );
}
