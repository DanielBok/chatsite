import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import classNames from "classnames";
import React from "react";


type Props = Pick<Recipe, "ingredients"> & {
  className?: string
}

export default function Ingredients({className, ingredients}: Props) {
  return (
    <div className={classNames("flex flex-col p-2", className)}>
      <div className="text-lg font-bold underline mb-4">Ingredients</div>
      <ol className="pl-2 ml-4 marker:font-black">
        {ingredients.map((e, index) => (
          <li key={index} className="list-disc pl-4">{e.description}</li>
        ))}
      </ol>
    </div>
  );
}
