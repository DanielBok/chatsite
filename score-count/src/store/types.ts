import { GameReducer } from "@/store/game/types";
import { MetaReducer } from "@/store/meta/types";

export type RootState = {
  game: GameReducer,
  meta: MetaReducer,
}