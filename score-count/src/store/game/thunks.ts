import { makeUrl } from "@/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as T from "./types";


export const createGame = createAsyncThunk<
  T.CreateRoomResponse,
  Omit<T.CreateRoomResponse, "id">,
  { rejectValue: string }
>(
  "game/create",
  async ({name, maxPlayers}, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data: {max_players, ...data}} = await axios.post<Omit<T.CreateRoomResponse, "maxPlayers"> & {
        max_players: number
      }>
      (makeUrl("/sc/game"), {name, max_players: maxPlayers});
      return fulfillWithValue({...data, maxPlayers: max_players});
    } catch (e) {
      const {detail} = (e as AppAxiosError).response!.data;
      return rejectWithValue(detail);
    }
  }
);

export const checkGameDetails = createAsyncThunk<
  T.CreateRoomResponse,
  number,
  { rejectValue: string }
>(
  "game/check",
  async (gameId, {rejectWithValue, fulfillWithValue}) => {
    try {
      const {data} = await axios.get<T.CreateRoomResponse>(makeUrl(`/sc/game/${gameId}`));
      return fulfillWithValue(data);
    } catch (e) {
      const {detail} = (e as AppAxiosError).response!.data;
      return rejectWithValue(detail);
    }
  }
);