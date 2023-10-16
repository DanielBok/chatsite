import { accountSlice } from "@/store/account/slice";
import { configureStore } from "@reduxjs/toolkit";
import { isEqual } from "radash";
import { useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useRootSelector<Selected>(selector: ((state: RootState) => Selected)) {
  return useSelector(selector, isEqual);
}

export default store;
