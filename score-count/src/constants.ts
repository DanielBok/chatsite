export const BACKEND_BASE_URL = (function () {
  return `${import.meta.env.BASE_HOST}:${import.meta.env.BASE_PORT}`;
})();

// helper to create the url for API requests
export function makeUrl(path: string) {
  path = path.replace(/^\/*/, "");

  return `${location.protocol}//${BACKEND_BASE_URL}/${path}`;
}