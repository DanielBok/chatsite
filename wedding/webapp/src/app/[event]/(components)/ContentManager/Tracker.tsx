"use client";

import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContentManagerContext } from "./context";
import { ContentManagerContextDataType } from "./types";

/**
 * Fetches more data when the user has scrolled to the end
 */
export default function Tracker({children}: React.PropsWithChildren) {
  const {
    contents,
    hasMore,
    continuationToken,
    event,
    updateContent
  } = useContentManagerContext();

  useEffect(() => {
    const controller = new AbortController();
    fetchMoreContent(controller.signal);
    return () => controller.abort();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <InfiniteScroll
      dataLength={contents.length}
      hasMore={hasMore}
      next={fetchMoreContent}
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
      ["maxKeys", 30]
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


