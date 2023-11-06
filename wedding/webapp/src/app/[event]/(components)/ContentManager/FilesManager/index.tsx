"use client";

import { orderedGroupBy } from "@/lib/functools";
import React, { useEffect } from "react";
import { useContentManagerContext } from "../context";
import { useFilteredContents } from "../hooks";
import { ContentManagerContextDataType } from "../types";
import Album from "./Album";

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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

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