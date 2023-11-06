import { pickRandom, range } from "@/lib/functools";

export const COLORS = [
  "bg-red-700",
  "bg-emerald-700",
  "bg-blue-700",
  "bg-pink-700",
  "bg-indigo-700",
  "bg-amber-700",
  "bg-violet-700",
  "bg-emerald-600",
  "bg-indigo-600",
  "bg-blue-600",
  "bg-red-600",
  "bg-pink-600",
  "bg-amber-600",
  "bg-violet-600",
];


export function getColorList(n: number) {
  if (n === 0) return [];

  const step = pickRandom([-1, 1]);
  let start: number, stop: number;
  if (step > 0) {
    start = pickRandom(range(COLORS.length));
    stop = start + n;
  } else {
    start = pickRandom(range(COLORS.length)) + n;
    stop = start - n;
  }

  return range(start, stop, step)
    .reduce((acc, i) => [...acc, COLORS[i % COLORS.length]], [] as string[]);
}