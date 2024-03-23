import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { MetaReducer } from "./types.ts";

const COOKIES_KEY = "META_COOKIE";

const initialState: MetaReducer = {
  uuid: "",
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

function saveMetaToCookie(uuid: string, name: string) {
  const data = {name, uuid};
  Cookies.set(COOKIES_KEY, JSON.stringify(data));
}

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    startup(state) {
      const dat = tryLoadFromCookies() || {name: "", uuid: crypto.randomUUID()};
      state.name = dat.name;
      state.uuid = dat.uuid;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
      if (state.uuid === "") {
        state.uuid = crypto.randomUUID();
      }

      saveMetaToCookie(state.uuid, state.name);
    }
  }
});

export type { MetaReducer };
