// import WebSocket from "ws";
import { metaSlice } from "@/store/meta/reducer.ts";
import { rootReducer, RootState } from "@/store/reducer.ts";
import { configureStore } from "@reduxjs/toolkit";
import { isEqual } from "radash";
import { useDispatch, useSelector } from "react-redux";

export const store = (function () {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: true,
  });

  // startup actions
  store.dispatch(metaSlice.actions.startup());

  return store;
})();


export const useAppDispatch: () => typeof store.dispatch = useDispatch;

export function useRootSelector<Selected>(selector: (state: RootState) => Selected) {
  return useSelector(selector, isEqual);
}

export type { RootState };