import { GameReducer } from "@/store/game/types.ts";
import { MetaReducer } from "@/store/meta/types.ts";

export type RootState = {
  game: GameReducer,
  meta: MetaReducer,
}