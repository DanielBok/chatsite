"use client";

import { useAlbumContext } from "@/app/[event]/(components)/ContentManager/FilesManager/context";
import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import { useIsMobile } from "@/lib/hooks";
import React, { useMemo, useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import Badge from "./Badge";
import { getColorList } from "./constants";

type Props = {
  id: string
  tags: string[]
  src: string
}

export default function EditModal({id, src, tags}: Props) {
  const {updateContent} = useAlbumContext();
  const [formTags, setFormTags] = useState(tags);
  const [newTag, setNewTag] = useState("");

  return (
    <dialog id={id} className="modal">
      <div className="modal-box w-11/12 max-w-5xl">
        <div className="flex justify-between border-b-gray-200 border-b items-center pb-1">
          <h3 className="font-bold text-2xl">Edit Tags</h3>
          <VscChromeClose
            className="text-2xl cursor-pointer"
            onClick={closeModal}
          />
        </div>
        <div className="flex flex-col">
          <Description/>
          <TagSection formTags={formTags} setFormTags={setFormTags} src={src}/>

          <div className="join">
            <input
              type="text"
              placeholder="New Tag"
              className="input input-sm input-bordered join-item sm:w-[16rem] md:w-[32rem]"
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyUp={e => {
                if (e.key === "Enter") {
                  if (e.ctrlKey) updateTags();
                  else addTag();
                }
              }}
            />
            <button
              className="btn btn-sm join-item rounded-r-full"
              onClick={addTag}
            >
              Add
            </button>
          </div>

        </div>

        <div className="modal-action">
          <div className="flex justify-end">
            <div>
              <button
                className="btn btn-success text-white min-w-[100px] hover:bg-emerald-500 mx-4"
                onClick={updateTags}
              >
                Save
              </button>
              <button
                className="btn btn-warning text-white min-w-[100px] hover:bg-amber-500"
                onClick={() => setFormTags(tags)}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );

  function closeModal() {
    (document.getElementById(id) as HTMLDialogElement).close();
  }

  function addTag() {
    const newTags = newTag.split(",")
      .map(x => x.trim().toLowerCase())
      .filter(x => x.length > 0 && formTags.indexOf(x) === -1);

    if (newTags.length > 0) {
      setFormTags(v => ([...v, ...newTags]));
      setNewTag("");
    }
  }

  function updateTags() {
    const match = src.match(/\/(memories\/.*)$/);
    if (!match) {
      return;
    }

    const newTags = formTags.toSorted();
    if (newTags.length === tags.length) {
      const allSame = tags.toSorted().reduce((isSame, e, index) => isSame && (newTags[index] === e), true);
      if (allSame) return;
    }

    const key = match[1];
    fetch("/api/tags", {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({key, tags: newTags}),
      redirect: "follow"
    }).then(resp => resp.json())
      .then((body: ContentInfo) => {
        updateContent(body);
      });
  }
}


function Description() {
  const isMobile = useIsMobile();

  return (
    <>
      <p className="py-4">
        Click on the trash button to remove the tag. To add new tags, enter the new tag
        into the input box and click add. When everything is okay, click on the save
        button below to save the changes.
      </p>
      {
        !isMobile && (
          <p>
            <small>
              <code>Enter</code> to add Tag. {" "}
              <code>Ctrl-Enter</code> to save. {" "}
              <code>Esc</code> to exit. {" "}
              <code>, (Comma)</code> for quick separation. (i.e. daniel,priscilla creates 2 tags)
            </small>
          </p>
        )
      }
    </>
  );
}

function TagSection(
  {
    src,
    formTags,
    setFormTags
  }: {
    src: string
    formTags: string[]
    setFormTags: React.Dispatch<React.SetStateAction<string[]>>
  }) {
  const colors = useMemo(() => getColorList(formTags.length), [formTags]);

  return (
    <div>
      <div className="text-lg font-bold underline mt-2">
        Tags
      </div>
      <div className="py-4 flex flex-row flex-wrap">
        {formTags.map((tag, index) => (
          <Badge
            key={`modal-${tag}-${src}`}
            text={tag}
            className={colors[index]}
            onDelete={(selected) => {
              setFormTags(v => v.filter(e => e !== selected));
            }}
          />
        ))}
      </div>
    </div>
  );
}