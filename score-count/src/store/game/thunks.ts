import { makeUrl } from "@/constants.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as T from "./types.ts";

export const joinGame = createAsyncThunk(
  "game/join",
  async () => {

  }
);

export const createGame = createAsyncThunk(
  "game/create",
  async (name: string, {rejectWithValue}) => {
    try {
      const {data} = await axios.post<T.CreateRoomResponse>(
        makeUrl("/sc/game"), {name});
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);