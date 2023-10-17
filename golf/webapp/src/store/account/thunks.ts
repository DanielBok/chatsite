import { decodeTokenAndSetCookies } from "@/store/account/utils";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const JWT_COOKIE = "jwt";

type TokenResponse = {
  token: string
}

export const userLogIn = createAsyncThunk(
  "account/user-log-in",
  async (auth: { username: string, password: string }) => {
    const {data: {token}} = await axios.get<TokenResponse>("account/login", {auth});
    return decodeTokenAndSetCookies(token);
  }
);

export const verifyToken = createAsyncThunk(
  "account/verify-token",
  async (token: string) => {

    const {status} = await axios.get("account/verify", {headers: {Authorization: `Bearer ${token}`}});
    if (status >= 200 && status < 300) {
      return decodeTokenAndSetCookies(token);
    }
    return;
  }
);

export const updateAccount = createAsyncThunk(
  "account/update",
  async (formData: FormData) => {
    if (!axios.defaults.headers.common["Authorization"]) {
      throw new Error("Must be logged in to update account");
    }

    const {data: {token}} = await axios.putForm<TokenResponse>("account", formData);
    return decodeTokenAndSetCookies(token)!;
  }
);
