import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import React from "react";


type Props = Pick<Recipe, "directions">

export default function Directions({directions}: Props) {
  return (
    <div className="flex flex-col p-2">
      <div className="text-lg font-bold underline mb-4">Ingredients</div>
      <ol className="pl-2 ml-4">
        {directions.map((e, index) => (
          <li key={index} className="list-decimal pl-4">{e}</li>
        ))}
      </ol>
    </div>
  );
}
