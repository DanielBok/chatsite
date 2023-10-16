import { Tee } from "@/app/(with-session)/course/types";

export const APP_NAME = "Golf for Chats";


export function getConversionMap(metric: "meter" | "yard") {
  return metric === "meter"
    ? {meter: 1, yard: 1.0936132983}
    : {meter: 0.91440276, yard: 1};
}


export const TEE_COLOR_CLASS: Record<Tee, string> = {
  Gold: "!bg-amber-400 !text-white",
  Silver: "!bg-gray-400 !text-black",
  Black: "!bg-black !text-white",
  Blue: "!bg-blue-700 !text-white",
  White: "!bg-white !text-black",
  Yellow: "!bg-yellow-300 !text-white",
  Red: "!bg-red-600 !text-white",
  Green: "!bg-green-600 !text-white",
};
