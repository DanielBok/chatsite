// import WebSocket from "ws";
// import { BACKEND_BASE_URL } from "../constants.ts";
// import { WebSocketMiddleware } from "./middlewares";
import { rootReducer, RootState } from "@/store/reducer.ts";
import { configureStore } from "@reduxjs/toolkit";
import { isEqual } from "radash";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat([
    // WebSocketMiddleware<RootState>(new WebSocket(`ws://${BACKEND_BASE_URL}/sc/game-ws`),
    //   () => {
    //
    //   }),  // game web-socket
  ]),
  devTools: import.meta.env.DEV,
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export function useRootSelector<Selected>(selector: (state: RootState) => Selected) {
  return useSelector(selector, isEqual);
}

export type { RootState };