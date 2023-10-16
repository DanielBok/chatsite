import { User } from "@/store/account/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";

const JWT_COOKIE = "jwt";

type TokenResponse = {
  token: string
}

export const userLogIn = createAsyncThunk(
  "account/user-log-in",
  async (auth: { username: string, password: string }, password) => {
    const {data: {token}} = await axios.get<TokenResponse>("account/login", {auth});
    const [user, maxAge] = decodeToken(token);

    if (maxAge > 0) {
      Cookies.set(JWT_COOKIE, token, {expires: maxAge, sameSite: "strict"});
    } else {
      return;
    }

    return user!;

    function decodeToken(token: string): [User | null, number] {
      const {nbt, exp, ...user} = jwtDecode<User & { nbt: number, exp: number }>(token);
      const now = dayjs().unix();

      if (nbt < now && now < exp) {
        return [user, exp - now - 3600];  // expires 1 hour before
      } else {
        return [null, 0];
      }
    }
  }
);