import { gameSlice } from "@/store/game/reducer.ts";
import { metaSlice } from "@/store/meta/reducer.ts";
import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices(gameSlice, metaSlice);

export type RootState = ReturnType<typeof rootReducer>;