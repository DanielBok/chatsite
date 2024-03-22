import { createSlice } from "@reduxjs/toolkit";
import { GameReducer } from "./types.ts";
import * as A from "./thunks.ts";

const initialState: GameReducer = {
  room: null,
  scores: [],
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
    builder.addCase(A.createGame.fulfilled, (
      state, {payload}) => {
      state.room = payload;
      state.loading.room = "success";
    }).addCase(A.createGame.pending,
        (state) => {
          state.room = null;
          state.scores = [];
          state.loading.room = "pending";
          state.error = null;
        })
      .addCase(A.createGame.rejected, (state, {payload}) => {
        state.room = null;
        state.loading.room = "error";
        console.log(payload);
      });
  }
});

export type { GameReducer };
