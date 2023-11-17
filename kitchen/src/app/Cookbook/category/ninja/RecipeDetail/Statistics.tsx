import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import React from "react";

type Props = Pick<Recipe, "difficulty" | "servings" | "timing">

export default function RecipeStatistics({}: Props) {
  return (
    <div>

    </div>
  );
}
