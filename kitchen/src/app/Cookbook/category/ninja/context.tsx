import React, { createContext, useContext, useState } from "react";
import { Outlet } from "react-router";
import original from "./recipes";
import { Recipe } from "./recipes/types";

type NinjaCookbookContextType = {
  original: Record<string, Recipe>
  recipes: Record<string, Recipe>
  setRecipes: React.Dispatch<React.SetStateAction<Record<string, Recipe>>>
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