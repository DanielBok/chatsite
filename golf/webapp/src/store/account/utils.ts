import { User } from "@/store/account/types";
import axios from "axios";
import dayjs from "dayjs";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

const JWT_COOKIE = "jwt";


export function decodeToken(token: string): [User | null, number] {
  const {nbt, exp, ...user} = jwtDecode<User & { nbt: number, exp: number }>(token);
  const now = dayjs().unix();

  if (nbt < now && now < exp) {
    return [user, exp - now - 3600];  // expires 1 hour before
  } else {
    return [null, 0];
  }
}

export function decodeTokenAndSetCookies(token: string) {
  const [user, maxAge] = decodeToken(token);
  if (!user || maxAge <= 0) return;

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  Cookies.set(JWT_COOKIE, token, {expires: maxAge, sameSite: "strict"});

  return user;
}


export function removeJWTCookie() {
  Cookies.remove(JWT_COOKIE);
}


export function getJWTFromCookies() {
  return Cookies.get(JWT_COOKIE);

}