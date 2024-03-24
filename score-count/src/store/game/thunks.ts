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
  async (payload: Omit<T.CreateRoomResponse, "id">, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await axios.post<T.CreateRoomResponse>(
        makeUrl("/sc/game"), payload
      );
      return fulfillWithValue(data);
    } catch (e) {
      const {detail} = (e as AppAxiosError).response!.data;
      return rejectWithValue(detail);
    }
  }
);