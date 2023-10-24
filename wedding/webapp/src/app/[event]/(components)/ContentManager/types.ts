import { EventType } from "@/lib/pages";
import { fetchThumbnails } from "@/lib/s3";

export type ContentInfo = Awaited<ReturnType<typeof fetchThumbnails>>["contents"][number];

export type ContentManagerContextType = {
  event?: EventType,
  contents: ContentInfo[]
  continuationToken?: string
  hasMore: boolean
  updateContent: (v: ContentManagerContextDataType) => void,
}

export type ContentManagerContextDataType = Pick<ContentManagerContextType, "contents" | "hasMore" | "continuationToken">;
