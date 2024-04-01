import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { MetaReducer } from "./types";

const COOKIES_KEY = "META_COOKIE";

const initialState: MetaReducer = {
  name: null
};

function tryLoadFromCookies(): MetaReducer | null {
  const data = Cookies.get(COOKIES_KEY);
  if (!data) {
    return null;
  } else {
    return JSON.parse(data);
  }
}

function saveMetaToCookie(name: string | null) {
  const data = {name};
  Cookies.set(COOKIES_KEY, JSON.stringify(data), {expires: 7});  // expires in 7 days
}

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    startup(state) {
      const dat = tryLoadFromCookies() || {name: ""};
      state.name = dat.name || null;
    },
    setName(state, action: PayloadAction<string | null>) {
      const name = action.payload;

      state.name = name;
      saveMetaToCookie(name);
    }
  }
});

export type { MetaReducer };
