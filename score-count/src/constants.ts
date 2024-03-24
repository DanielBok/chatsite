export const BACKEND_BASE_URL = (function () {
  return `${import.meta.env.VITE_BASE_HOST}:${import.meta.env.VITE_BASE_PORT}`;
})();

// helper to create the url for API requests
export function makeUrl(path: string) {
  path = path.replace(/^\/*/, "");

  return `${location.protocol}//${BACKEND_BASE_URL}/${path}`;
}