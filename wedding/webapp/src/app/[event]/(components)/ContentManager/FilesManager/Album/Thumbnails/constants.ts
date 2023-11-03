import { ContentInfo } from "@/app/[event]/(components)/ContentManager/types";
import classNames from "classnames";

export function cardClasses(contentType: ContentInfo["contentType"]) {
  const classes = ["card bg-base-100 shadow-xl mb-4 cursor-pointer"];
  if (contentType === "video") {
    classes.push("bg-indigo-100");
  } else {
    classes.push("bg-neutral-200");
  }

  return classNames(classes);
}