import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { v4 as uuid4 } from "uuid";
import { MetaReducer } from "./types";

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

function saveMetaToCookie(uuid: string, name: string | null) {
  const data = {name, uuid};
  Cookies.set(COOKIES_KEY, JSON.stringify(data), {expires: 7});  // expires in 7 days
}

export const metaSlice = createSlice({
  name: "meta",
  initialState,
  reducers: {
    startup(state) {
      const dat = tryLoadFromCookies() || {name: "", uuid: uuid4()};
      state.name = dat.name || null;
      state.uuid = dat.uuid;
    },
    setName(state, action: PayloadAction<string | null>) {
      const name = action.payload;

      state.name = name;
      if (state.uuid === "") {
        state.uuid = crypto.randomUUID();
      }

      saveMetaToCookie(state.uuid, name);
    }
  }
});

export type { MetaReducer };
