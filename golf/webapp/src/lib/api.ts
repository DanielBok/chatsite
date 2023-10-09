export function makeUrl(path: string) {
  // remove forward and trailing slashes
  path = path.replace(/^\/*/, "").replace(/\/*$/, "");
  return `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
}
