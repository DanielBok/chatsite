import { EventType } from "@/lib/pages";
import { CopyObjectCommand, HeadObjectCommand, ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { cache } from "react";

export const revalidate = 3600 * 24;


type ContentType = "image" | "video";
type ContentOrientation = "portrait" | "landscape";

const BUCKET = "chatsite";
const ORIGIN = `https://${BUCKET}.sgp1.digitaloceanspaces.com`;
const DELIM = "::";

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

  const contents = await Promise.all(result.Contents!.map(({Key}) => processThumbnail(Key!)));

  return {
    contents,
    continuationToken: result.NextContinuationToken,
    hasMore: result.IsTruncated!
  };

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

async function processThumbnail(key: string) {
  key = key.replace(/^\/*/, "");
  const [location, photoSource, section] = key.split("/").slice(2, -1);

  const meta = await s3Client.send(new HeadObjectCommand({Bucket: BUCKET, Key: key}));
  const width = parseInt(meta.Metadata!["width"]);
  const height = parseInt(meta.Metadata!["height"]);
  const tags = meta.Metadata!["tags"]?.split(DELIM) || [];

  const thumbnailUrl = `${ORIGIN}/${key}`;
  const source = parseSource(photoSource);

  return {
    key,
    url: {thumbnail: thumbnailUrl, src: thumbnailUrl.replace("/wedding-thumbnails/", "/wedding/")},
    location: titleCase(location),
    source,
    section: parseSection(section, location, source),
    contentType: meta.ContentType!.split("/")[0] as ContentType,
    dim: {width, height},
    tags,
    orientation: height > width ? "portrait" : "landscape" as ContentOrientation,
  };
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
    const tags = meta.Metadata!["tags"]?.split(DELIM) || [];

    const source = parseSource(photoSource);

    return {
      key,
      url: `${ORIGIN}/${key}`,
      location: titleCase(location),
      source,
      section: parseSection(section, location, source),
      contentType: meta.ContentType!.split("/")[0] as ContentType,
      dim: {width, height},
      tags,
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


/**
 * Tags are only applicable for thumbnails
 * @param key Bucket key
 * @param tags New tags to replace old tags in the metadata section
 */
export async function updateTags(key: string, tags: string[]) {
  // new tags are lower cased, unique, non-empty and sorted
  const joinedTag = Array.from(
    new Set(
      tags.map(s => s.toLowerCase().trim().replace(/\s{2,}/, " "))
    )
  ).filter(e => e).sort().join(DELIM);

  const head = await s3Client.send(new HeadObjectCommand({
    Bucket: BUCKET,
    Key: key
  }));

  // drop the old tags key since we are replacing it
  const {tags: _, ...metadata} = head.Metadata!;

  const {$metadata: {httpStatusCode}} = await s3Client.send(new CopyObjectCommand({
    Bucket: BUCKET,
    Key: key,
    CopySource: `${BUCKET}/${key}`,
    ACL: "public-read",
    Metadata: {...metadata, tags: joinedTag},
    MetadataDirective: "REPLACE",
    ContentType: head.ContentType,
  }));

  if (httpStatusCode !== 200) {
    throw new Error("Did not update tags successfully");
  }

  return await processThumbnail(key);
}