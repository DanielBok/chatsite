import { AccountReducer } from "@/store/account/types";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import * as A from "./thunks";
import { JWT_COOKIE } from "./thunks";

const initialState: AccountReducer = {
  loading: false,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    signOut: state => {
      Cookies.remove(JWT_COOKIE);
      delete axios.defaults.headers.common["Authorization"];
      delete state.user;
    },
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

    // verify token
    builder
      .addCase(A.verifyToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(A.verifyToken.rejected, (state) => {
        state.loading = false;
        delete state.user;
      })
      .addCase(A.verifyToken.fulfilled, (state, {payload}) => {
        state.loading = false;
        state.user = payload;
      });
  }
});

export const {signOut} = accountSlice.actions;
