import { decodeToken } from "@/store/account/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const JWT_COOKIE = "jwt";

type TokenResponse = {
  token: string
}

export const userLogIn = createAsyncThunk(
  "account/user-log-in",
  async (auth: { username: string, password: string }) => {
    const {data: {token}} = await axios.get<TokenResponse>("account/login", {auth});
    const [user, maxAge] = decodeToken(token);

    if (maxAge > 0) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      Cookies.set(JWT_COOKIE, token, {expires: maxAge, sameSite: "strict"});
    } else {
      return;
    }

    return user!;
  }
);

export const verifyToken = createAsyncThunk(
  "account/verify-token",
  async (token: string) => {

    const {status} = await axios.get("/account/verify", {headers: {Authorization: `Bearer ${token}`}});
    if (status >= 200 && status < 300) {
      const [user] = decodeToken(token);
      if (user) {
        return user;
      }
    }
    return;
  }
);