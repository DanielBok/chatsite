import { makeUrl } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as T from "./types";

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

export const checkGameDetails = createAsyncThunk(
  "game/check",
  async (gameId: number, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await axios.get<T.CreateRoomResponse>(makeUrl(`/sc/game/${gameId}`));
      return fulfillWithValue(data);
    } catch (e) {
      const {detail} = (e as AppAxiosError).response!.data;
      return rejectWithValue(detail);
    }
  }
);