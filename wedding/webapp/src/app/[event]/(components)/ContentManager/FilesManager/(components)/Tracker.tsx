"use client";

import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDebouncedCallback } from "use-debounce";
import { useContentManagerContext } from "../../context";
import { useFilteredContents } from "../../hooks";
import { ContentManagerContextDataType } from "../../types";

/**
 * Fetches more data when the user has scrolled to the end. Initial load from FilesManager useEffect
 */
export default function Tracker({children}: React.PropsWithChildren) {
  const {
    hasMore,
    continuationToken,
    event,
    updateContent,
    tagFilter,
  } = useContentManagerContext();

  const debouncedFetch = useDebouncedCallback(fetchMoreContent, 1000);
  const contents = useFilteredContents();

  useEffect(() => {
    if (contents.length === 0 && hasMore) {
      debouncedFetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contents]);

  return (
    <InfiniteScroll
      dataLength={contents.length}
      hasMore={hasMore}
      next={debouncedFetch}
      loader={(
        <div className="flex justify-center items-center">
          <span className="loading loading-dots loading-md"/>
        </div>
      )}
    >
      {children}
    </InfiniteScroll>
  );

  function fetchMoreContent(signal?: AbortSignal) {
    const params = [
      ["event", event],
      ["continuationToken", continuationToken],
      ["maxKeys", 30],
      ["filter", tagFilter],
    ].filter(([, v]) => v)
      .reduce((acc: string[], [k, v]) => [...acc, `${k}=${v}`], [])
      .join("&");

    fetch(`/api/content?${params}`, {cache: "default", signal})
      .then(resp => resp.json())
      .then((result: ContentManagerContextDataType) => {
        updateContent(result);
      });
  }
}


