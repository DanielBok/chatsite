import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import React from "react";


type Props = Pick<Recipe, "ingredients">

export default function Ingredients({ingredients}: Props) {
  return (
    <div className="flex flex-col p-2">
      <div className="text-lg font-bold underline mb-4">Ingredients</div>
      <ol className="pl-2 ml-4">
        {ingredients.map((e, index) => (
          <li key={index} className="list-disc pl-4">{e.description}</li>
        ))}
      </ol>
    </div>
  );
}
