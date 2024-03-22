import { configureStore } from "@reduxjs/toolkit";
import { isEqual } from "radash";
import { useSelector } from "react-redux";
// import WebSocket from "ws";
// import { BACKEND_BASE_URL } from "../constants.ts";
// import { WebSocketMiddleware } from "./middlewares";
import { gameSlice } from "@/store/game/reducer.ts";
import { metaSlice } from "@/store/meta/reducer.ts";

import type { RootState } from "./types.ts";


export const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    meta: metaSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
    // WebSocketMiddleware<RootState>(new WebSocket(`ws://${BACKEND_BASE_URL}/sc/game-ws`),
    //   () => {
    //
    //   }),  // game web-socket
  ]),
  devTools: import.meta.env.DEV,
});

export type AppDispatch = typeof store.dispatch;

export function useRootSelector<Selected>(selector: (state: RootState) => Selected) {
  return useSelector(selector, isEqual);
}

export type { RootState };