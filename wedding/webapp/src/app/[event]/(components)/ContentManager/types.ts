import { EventType } from "@/lib/pages";
import { fetchThumbnails } from "@/lib/s3";

export type ContentInfo = Awaited<ReturnType<typeof fetchThumbnails>>["contents"][number];

export type ContentManagerContextType = {
  mode: "View" | "Download" | "Edit"
  event?: EventType
  contents: ContentInfo[]
  continuationToken?: string
  hasMore: boolean
  updateContent: (v: ContentManagerContextDataType) => void
  setMode: (v: ContentManagerContextType["mode"]) => void
  tagFilter: string
  setTagFilter: (f: string) => void
}

export type ContentManagerContextDataType = Pick<ContentManagerContextType, "contents" | "hasMore" | "continuationToken">;
