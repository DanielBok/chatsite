"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import { orderedGroupBy } from "@/lib/functools";
import React from "react";
import Album from "./Album";

export default function FilesManager() {
  const {contents} = useContentManagerContext();

  return (
    <div className="container">
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