import Cookies from "js-cookie";

const REDIRECT_PATH = "REDIRECT_PATH";


export function setRedirectBackPath(pathname: string) {
  Cookies.set(REDIRECT_PATH, pathname, {sameSite: "strict"});
}

export function getRedirectBackPath(defaultPath = "/") {
  return Cookies.get(REDIRECT_PATH) || defaultPath;
}

export function removeRedirectBackPath() {
  Cookies.remove(REDIRECT_PATH);
}