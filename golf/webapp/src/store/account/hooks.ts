import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";
import { isEqual } from "radash";
import { useSelector } from "react-redux";

const selectUser = createSelector
(
  (s: RootState) => s.account.user,
  (user) => user,
  {memoizeOptions: {equalityCheck: isEqual}}
);

export const useUser = () => useSelector(selectUser);