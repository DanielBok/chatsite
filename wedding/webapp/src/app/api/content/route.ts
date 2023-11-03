import { EventType } from "@/lib/pages";
import { fetchThumbnails } from "@/lib/s3";
import Fuse from "fuse.js";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const filter = searchParams.get("filter");

  if (!filter) {
    const data = await fetchThumbnails({
        event: searchParams.get("event") as EventType || undefined,
        maxKeys: searchParams.has("maxKeys") ? parseInt(searchParams.get("maxKeys") as string) : 25,
        continuationToken: searchParams.get("continuationToken") || undefined,
      }
    );

    return Response.json(data);

  } else {
    let continuationToken = searchParams.get("continuationToken") || undefined;
    const maxKeys = 1000;  // just search the max limit
    const event = searchParams.get("event") as EventType || undefined;
    const contents = [];

    while (true) {
      const result = await fetchThumbnails({
          event,
          maxKeys,
          continuationToken,
        }
      );

      contents.push(...result.contents);
      continuationToken = result.continuationToken;
      if (!result.hasMore || !continuationToken) return Response.json({...result, contents});

      const fuse = new Fuse(result.contents.map(e => ({...e, searchField: e.tags.join(" ")})), {
        keys: ["searchField"],
        shouldSort: true,
        includeScore: true,
        ignoreLocation: true,
        threshold: 0.4,
      });

      if (fuse.search(filter).length > 0) return Response.json({...result, contents});
    }
  }
}