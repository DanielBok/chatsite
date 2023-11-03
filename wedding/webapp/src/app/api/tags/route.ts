import { updateTags } from "@/lib/s3";


export async function PUT(request: Request) {
  const {tags, key} = await request.json() as {
    key: string
    tags: string[]
  };
  const result = await updateTags(key, tags);
  return Response.json(result);
}