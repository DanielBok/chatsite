"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import { ContentInfo, ContentManagerContextDataType } from "@/app/[event]/(components)/ContentManager/types";
import { orderedGroupBy } from "@/lib/functools";
import React, { useEffect, useMemo } from "react";
import Album from "./Album";
import Fuse from "fuse.js";


const useFuseContents = () => {
  const {contents} = useContentManagerContext();
  return useMemo(() => new Fuse<ContentInfo>(contents.map(e => ({...e, searchField: e.tags.join(" ")})), {
      keys: ["searchField"],
      shouldSort: true,
      includeScore: true,
      ignoreLocation: true,
      threshold: 0.4,
    }),
    [contents]);
};

const useFilteredContents = () => {
  const {contents} = useContentManagerContext();
  const fuse = useFuseContents();
  const pattern = useContentManagerContext().tagFilter.split(/\s{2,}/).join(" ");

  if (!pattern) {
    return contents;
  }

  return fuse.search(pattern).map(e => e.item);
};

export default function FilesManager() {
  const {hasMore, updateContent, event, continuationToken, tagFilter} = useContentManagerContext();
  const contents = useFilteredContents();

  // initial data load
  useEffect(() => {
    const controller = new AbortController();
    if (contents.length === 0 && hasMore) {
      const params = [
        ["event", event],
        ["continuationToken", continuationToken],
        ["maxKeys", 30],
        ["filter", tagFilter]
      ].filter(([, v]) => v)
        .reduce((acc: string[], [k, v]) => [...acc, `${k}=${v}`], [])
        .join("&");

      fetch(`/api/content?${params}`, {cache: "default", signal: controller.signal})
        .then(resp => resp.json())
        .then((result: ContentManagerContextDataType) => {
          updateContent(result);
        });
    }

    return () => controller.abort();
  }, [contents.length, hasMore, event, continuationToken, tagFilter, updateContent]);

  return (
    <div className="p-4">
      {orderedGroupBy(contents, e => e.source)
        .map(([src, srcContents]) => {
          if (!srcContents || srcContents.length === 0) {
            return null;
          }

          if (srcContents[0].section === "") {
            return (
              <div key={src} className="flex flex-col mb-4">
                <div className="text-md font-bold text-gray-400 underline mb-2">
                  {src}
                </div>
                <Album contents={srcContents}/>
              </div>
            );
          } else {
            return (
              <div key={src} className="flex flex-col mb-4">
                <div className="text-md font-bold text-gray-400 underline">
                  {src}
                </div>
                {orderedGroupBy(srcContents, e => e.section)
                  .map(([section, sectionContents]) => {
                    if (!sectionContents || sectionContents.length === 0) {
                      return null;
                    }

                    return <div key={section}>
                      <div className="text-sm font-bold text-gray-300 underline mb-2 ml-2">
                        {section}
                      </div>
                      <Album contents={sectionContents}/>
                    </div>;
                  })}
              </div>
            );
          }
        })}
    </div>
  );
}