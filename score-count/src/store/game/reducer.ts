import { createSlice } from "@reduxjs/toolkit";
import * as A from "./thunks";
import * as T from "./types";

const initialState: T.GameReducer = {
  room: null,
  loading: {
    room: "success"
  },
  error: null
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {},
  extraReducers: builder => {
    [A.createGame, A.checkGameDetails]
      .forEach(thunk => {
        builder
          .addCase(thunk.fulfilled,
            (state, {payload}) => {
              state.room = payload;
              state.loading.room = "success";
            })
          .addCase(thunk.pending,
            (state) => {
              state.room = null;
              state.loading.room = "pending";
              state.error = null;
            })
          .addCase(thunk.rejected,
            (state, {payload}) => {
              state.room = null;
              state.error = payload!;
              state.loading.room = "error";
            });
      });
  }
});
