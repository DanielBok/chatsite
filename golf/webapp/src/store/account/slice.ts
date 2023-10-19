import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import * as A from "./thunks";
import { AccountReducer } from "./types";
import { removeJWTCookie } from "./utils";

const initialState: AccountReducer = {
  loading: false,
  updating: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: state => {
      removeJWTCookie();
      delete axios.defaults.headers.common["Authorization"];
      delete state.user;
    },
  },
  extraReducers: builder => {
    // login
    [A.userLogIn, A.verifyToken].forEach(action => {
      builder
        .addCase(action.pending, (state) => {
          state.loading = true;
        })
        .addCase(action.rejected, (state) => {
          state.loading = false;
          delete state.user;
        })
        .addCase(action.fulfilled, (state, {payload}) => {
          state.loading = false;
          state.user = payload;
        });
    });

    builder
      .addCase(A.updateAccount.pending, (state) => {
        state.updating = true;
      })
      .addCase(A.updateAccount.rejected, (state) => {
        state.updating = false;
      })
      .addCase(A.updateAccount.fulfilled, (state, {payload}) => {
        state.updating = false;
        state.user = payload;
      });
  }
});

export const {signOut} = accountSlice.actions;
