import { EventType } from "@/lib/pages";
import { fetchThumbnails } from "@/lib/s3";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);

  const data = await fetchThumbnails({
      event: searchParams.get("event") as EventType || undefined,
      maxKeys: searchParams.has("maxKeys") ? parseInt(searchParams.get("maxKeys") as string) : 25,
      continuationToken: searchParams.get("continuationToken") || undefined
    }
  );

  return Response.json(data);
}