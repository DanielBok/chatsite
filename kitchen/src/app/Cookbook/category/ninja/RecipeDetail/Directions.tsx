import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import classNames from "classnames";
import React from "react";


type Props = Pick<Recipe, "directions"> & {
  className?: string
}

export default function Directions({className, directions}: Props) {
  return (
    <div className={classNames("flex flex-col p-2", className)}>
      <div className="text-lg font-bold underline mb-4">Directions</div>
      <ol className="pl-2 ml-4 marker:font-black">
        {directions.map((e, index) => (
          <li key={index} className="list-decimal pl-4">{e}</li>
        ))}
      </ol>
    </div>
  );
}
