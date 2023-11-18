import ninjaRecipes from "@/app/Cookbook/category/ninja/recipes";
import { random } from "radash";
import React from "react";
import { useNavigate } from "react-router";

export default function RandomButton() {
  const navigate = useNavigate();

  return (
    <button
      className="ml-2 md:ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full py-2 md:py-4 px-4"
      onClick={() => {
        navigate(getRandomRecipePath(), {replace: true});
      }}
    >
      Random!
    </button>
  );
}

function getRandomRecipePath() {
  const cookbooks = {"ninja": ninjaRecipes};

  const category = randomChoice(Object.keys(cookbooks) as (keyof typeof cookbooks)[]);
  const cookbook = cookbooks[category];

  const recipeId = randomChoice(Object.keys(cookbook));

  return `/cookbook/${category}/${recipeId}`;

  function randomChoice<T>(choices: T[]) {
    return choices[random(0, choices.length - 1)];
  }
}

