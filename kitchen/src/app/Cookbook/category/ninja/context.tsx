import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";
import original from "./recipes";
import { Recipe } from "./recipes/types";

type NinjaCookbookContextType = {
  original: Recipe[]
  recipes: Recipe[]
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>
}

const NinjaCookbookContext = createContext({} as NinjaCookbookContextType);

export const useNinjaCookbookContext = () => useContext(NinjaCookbookContext);

export default function NinjaCookbookContextProvider() {
  const [recipes, setRecipes] = useState(original);

  return (
    <NinjaCookbookContext.Provider value={{original, recipes, setRecipes}}>
      <Outlet/>
    </NinjaCookbookContext.Provider>
  );
}