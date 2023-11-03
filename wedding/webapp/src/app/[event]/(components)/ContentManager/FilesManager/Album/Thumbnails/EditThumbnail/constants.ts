import { pickRandom } from "@/lib/functools";

export const COLORS = [
  "bg-red-700",
  "bg-amber-700",
  "bg-emerald-700",
  "bg-blue-700",
  "bg-indigo-700",
  "bg-violet-700",
  "bg-pink-700",
];


export function getColorList(n: number) {
  if (n === 0) return [];

  const colors = [pickRandom(COLORS)];
  for (let i = 1; i < n; i++) {
    let color = colors[colors.length - 1];
    while (color === colors[colors.length - 1]) {
      color = pickRandom(COLORS);
    }
    colors.push(color);
  }

  return colors;
}