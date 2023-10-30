import { EventType } from "@/lib/pages";
import { HeadObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { cache } from "react";

export const revalidate = 3600 * 24;


type ContentType = "image" | "video";
type ContentOrientation = "portrait" | "landscape";

const BUCKET = "chatsite";
const ORIGIN = `https://${BUCKET}.sgp1.digitaloceanspaces.com`;

const s3Client = new S3Client({
  forcePathStyle: true,
  endpoint: "https://sgp1.digitaloceanspaces.com",
  region: "sgp1",
  credentials: {
    accessKeyId: process.env.DO_SPACES_ACCESS_ID as string,
    secretAccessKey: process.env.DO_SPACES_SECRET_KEY as string,
  }
});


function titleCase(x: string) {
  return x.split(/([\-_ ])/)
    .map(v => v[0].toUpperCase() + v.toLowerCase().slice(1))
    .join("");
}

const videoExt = new Set(["mp4", "mov", "avi", "wmv", "avchd", "webm", "flv"]);


export async function fetchThumbnails(
  {
    event,
    continuationToken,
    maxKeys = 50,
  }: {
    event?: EventType
    continuationToken?: string
    maxKeys?: number,
  }) {

  const result = await s3Client.send(new ListObjectsV2Command({
    Bucket: BUCKET,
    Prefix: getPrefix(event),
    ContinuationToken: continuationToken,
    MaxKeys: maxKeys
  }));

  const contents = await Promise.all(result.Contents!.map(({Key}) => processKey(Key!)));

  return {
    contents,
    continuationToken: result.NextContinuationToken,
    hasMore: result.IsTruncated!
  };

  async function processKey(key: string) {
    key = key.replace(/^\/*/, "");
    const [location, photoSource, section] = key.split("/").slice(2, -1);

    const meta = await s3Client.send(new HeadObjectCommand({Bucket: BUCKET, Key: key}));
    const width = parseInt(meta.Metadata!["width"]);
    const height = parseInt(meta.Metadata!["height"]);

    const thumbnailUrl = `${ORIGIN}/${key}`;
    const source = parseSource(photoSource);

    return {
      key,
      url: {thumbnail: thumbnailUrl, src: thumbnailUrl.replace("/wedding-thumbnails/", "/wedding/")},
      location: titleCase(location),
      source,
      section: parseSection(section, location, source),
      contentType: meta.ContentType! as ContentType,
      dim: {width, height},
      orientation: height > width ? "portrait" : "landscape" as ContentOrientation,
    };
  }

  function getPrefix(event?: EventType) {
    const prefix = `memories/wedding-thumbnails`;

    switch (event) {
      case "bali":
        return `${prefix}/bali`;
      case "singapore":
        return `${prefix}/singapore`;
      case "pre-wedding":
        return `${prefix}/pre-wedding`;
      case undefined:
        return prefix;
      default:
        throw new Error(`Invalid event value: ${event}`);
    }
  }
}

export async function fetchContents() {
  let token: string | undefined = undefined;
  const results: Awaited<ReturnType<typeof processContent>>[] = [];

  do {
    const result = await listObjects(token);

    token = result.NextContinuationToken;
    if (result.Contents) {
      results.push(...await Promise.all(result.Contents!.map(e => processContent(e.Key!))));
    }
  } while (!token);

  return results;

  async function listObjects(token?: string) {
    return await s3Client.send(new ListObjectsV2Command({
      Bucket: BUCKET,
      Prefix: "memories/wedding/",
      ContinuationToken: token
    }));
  }

  async function processContent(key: string) {
    key = key.replace(/^\/*/, "");
    const [location, photoSource, section] = key.split("/").slice(2, -1);

    const meta = await s3Client.send(new HeadObjectCommand({Bucket: BUCKET, Key: key}));
    const width = parseInt(meta.Metadata!["width"]);
    const height = parseInt(meta.Metadata!["height"]);

    const source = parseSource(photoSource);

    return {
      key,
      url: `${ORIGIN}/${key}`,
      location: titleCase(location),
      source,
      section: parseSection(section, location, source),
      contentType: meta.ContentType! as ContentType,
      dim: {width, height},
      orientation: height > width ? "portrait" : "landscape" as ContentOrientation,
    };
  }
}


function parseSource(value: string) {
  if (value === "guest") {
    return "Guest";
  } else {
    value = (/^(?:\d+\.)?(\w+)$/).exec(value)![1];
    return titleCase(value);
  }
}

function parseSection(value: string, loc: string, src: string) {
  src = src.toLowerCase();
  loc = loc.toLowerCase();

  if (loc === "singapore" && src.indexOf("official") >= 0) {
    return titleCase(value.match(/\d+\.(\w+)/)![1]);
  } else if (loc === "bali" && src === "guest") {
    return value;
  }
  return "";
}

export const cacheFetchContents = cache(async () => await fetchContents());