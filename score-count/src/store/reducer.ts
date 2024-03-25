import { gameSlice } from "@/store/game/reducer";
import { metaSlice } from "@/store/meta/reducer";
import { combineSlices } from "@reduxjs/toolkit";

export const rootReducer = combineSlices(gameSlice, metaSlice);

export type RootState = ReturnType<typeof rootReducer>;