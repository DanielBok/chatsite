import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import classNames from "classnames";
import React from "react";

type Props = Pick<Recipe, "tips"> & {
  className?: string
}

export default function RecipeTips({className, tips}: Props) {
  if (!tips) {
    return null;
  }

  return (
    <div className="flex flex-row justify-center my-4">
      <div
        className={classNames("flex flex-row p-2 shadow bg-gray-200 rounded w-full md:w-1/2", className)}>
        <div className="text-xs mr-4 font-bold">Tips</div>
        <div className="flex flex-col">
          <ol className="text-sm">
            {tips.map((tip, i) => <li key={i}>{tip}</li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
