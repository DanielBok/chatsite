import { AccountReducer } from "@/store/account/types";
import { createSlice } from "@reduxjs/toolkit";
import * as A from "./thunks";

const initialState: AccountReducer = {
  loading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: state => {
      delete state.user;
    }
  },
  extraReducers: builder => {
    // login
    builder
      .addCase(A.userLogIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(A.userLogIn.rejected, (state) => {
        state.loading = false;
        delete state.user;
      })
      .addCase(A.userLogIn.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload;
      });
  }
});

export const {signOut} = accountSlice.actions;
