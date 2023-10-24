import { EventType } from "@/lib/pages";
import { ListObjectsV2Command, ListObjectsV2Output, S3Client } from "@aws-sdk/client-s3";


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

  const result: ListObjectsV2Output = await s3Client.send(new ListObjectsV2Command({
    Bucket: "chatsite",
    Prefix: getPrefix(event),
    ContinuationToken: continuationToken,
    MaxKeys: maxKeys
  }));

  const contents = (result.Contents || [])
    .filter(x => x.Key)
    .map(({Key}) => processKey(Key!));

  return {
    contents,
    continuationToken: result.NextContinuationToken,
    hasMore: result.IsTruncated!
  };

  function processKey(key: string) {
    key = key.replace(/^\/*/, "");
    const [location, photoSource, guest = ''] = key.split("/").slice(1, -1);
    const matches = key.match(/\/([\w\-_]+)\.(\d+)x(\d+)\.(\w+)$/)!;

    const name = matches[1];
    const width = parseInt(matches[2]);
    const height = parseInt(matches[3]);
    const ext = matches[4];

    const srcUrlPath = ["wedding", ...key.split("/").slice(1, -1), `${name}.${ext}`].join("/");

    let url = {
      thumbnail: `https://chatsite.sgp1.digitaloceanspaces.com/${key}`,
      src: `https://chatsite.sgp1.digitaloceanspaces.com/${srcUrlPath}`,
    };

    return {
      key,
      url,
      location: titleCase(location),
      source: parseSource(photoSource),
      guest,
      contentType: (videoExt.has(ext) ? "video" : "image") as "video" | "image",
      dim: {
        width,
        height,
      },
      alignment: height > width ? "portrait" : "landscape" as "portrait" | "landscape",
    };

    function parseSource(value: string) {
      if (value === "guest") {
        return "Guest";
      } else {
        value = (/^(?:\d+\.)?(\w+)$/).exec(value)![1];
        return titleCase(value);
      }
    }
  }

  function getPrefix(event?: EventType) {
    const prefix = "wedding-thumbnails";

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