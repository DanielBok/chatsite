import { DistanceMetric, Tee } from "@/store/course/types";
import { Dayjs } from "dayjs";

export type GolfGame = "Front 9" | "Back 9" | "18 Holes";

export type Score = {
  id: number;
  tee: Tee;
  game: GolfGame;
  datetime: Dayjs;
  metric: DistanceMetric;
  scores: {
    hole: number;
    par: number;
    index: number;
    distance: number;
    score: number;
  }[];
}