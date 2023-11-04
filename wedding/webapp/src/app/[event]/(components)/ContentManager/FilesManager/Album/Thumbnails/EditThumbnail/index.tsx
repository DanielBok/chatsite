import { useAlbumContext } from "@/app/[event]/(components)/ContentManager/FilesManager/context";
import React, { useMemo } from "react";
import { RenderPhotoProps } from "react-photo-album";
import Thumbnail from "../Thumbnail";
import Badge from "./Badge";
import { getColorList } from "./constants";
import EditModal from "./EditModal";

export default function EditThumbnail({photo}: RenderPhotoProps) {
  const index = parseInt(photo.key!);
  const {contentType, dim, tags} = useAlbumContext().contents[index];
  const colors = useMemo(() => getColorList(tags.length), [tags]);
  const modalID = `edit-model[${photo.src}]`;

  return (
    <>
      <Thumbnail
        photo={photo}
        dim={dim}
        contentType={contentType}
        body={tags.length > 0
          ? (
            <div className="flex flex-wrap">
              {tags.map((tag, index) => (
                <Badge
                  key={`${tag}-${photo.src}`}
                  text={tag}
                  className={colors[index]}
                />
              ))}
            </div>
          )
          : null
        }
        onClick={() => (document.getElementById(modalID) as HTMLDialogElement).showModal()}
      />
      <EditModal
        id={modalID}
        tags={tags}
        src={photo.src}
      />
    </>
  );
}
