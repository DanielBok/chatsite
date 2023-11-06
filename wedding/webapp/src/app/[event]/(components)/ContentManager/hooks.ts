import Fuse from "fuse.js";
import { useMemo } from "react";
import { useContentManagerContext } from "./context";
import { ContentInfo } from "./types";

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

export const useFilteredContents = () => {
  const {contents} = useContentManagerContext();
  const fuse = useFuseContents();
  const pattern = useContentManagerContext().tagFilter.split(/\s{2,}/).join(" ");

  if (!pattern) {
    return contents;
  }

  return fuse.search(pattern).map(e => e.item);
};