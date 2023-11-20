import { useNinjaCookbookContext } from "@/app/Cookbook/category/ninja/context";
import { Select, Switch } from "antd";
import classNames from "classnames";
import { alphabetical } from "radash";
import React, { useState } from "react";


export default function SearchByIngredientsInput() {
  const {setRecipes, original} = useNinjaCookbookContext();
  const [condition, setCondition] = useState<"and" | "or">("and");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  const ingredientRecipeMap = Object.values(original).reduce((acc, {id, ingredients}) => {
    ingredients.forEach(({searchKey}) => {
      if (!acc.hasOwnProperty(searchKey)) {
        acc[searchKey] = new Set();
      }
      acc[searchKey].add(id);
    });
    return acc;
  }, {} as Record<string, Set<string>>);


  const options = alphabetical(Object.keys(ingredientRecipeMap).map((value) => ({value})), e => e.value);

  return (
    <div className="w-full md:w-1/2 px-4 flex items-center">
      <Select
        mode="multiple"
        placeholder="Please select ingredients"
        className="w-full"
        onChange={onSelectChange}
        options={options}
        value={selectedIngredients}
      />
      <Switch
        checkedChildren={<span className="mr-1">AND</span>}
        unCheckedChildren={<span className="ml-1">OR</span>}
        defaultChecked
        onChange={checked => {
          const newCondition = checked ? "and" : "or";
          setCondition(newCondition);
          updateRecipes(selectedIngredients, newCondition);
        }}
        className={classNames("ml-2", condition === "and" ? "bg-blue-600" : "bg-slate-600")}
      />
    </div>
  );

  function onSelectChange(ingredients: string[]) {
    setSelectedIngredients(ingredients);
    updateRecipes(ingredients, condition);
  }

  function updateRecipes(ingredients: string[], joinCondition: typeof condition) {
    if (ingredients.length === 0) {
      setRecipes(original);
    } else {
      const recipeIds = Array.from(
        ingredients.reduce((acc, ing, index) => {
          const sub = ingredientRecipeMap[ing];
          if (joinCondition === "or") {
            sub.forEach(v => {
              acc.add(v);
            });
            return acc;
          } else {
            if (index === 0) {
              return sub;
            }

            const newAcc = new Set<string>();
            sub.forEach(v => {
              if (acc.has(v)) {
                newAcc.add(v);
              }
            });
            return newAcc;
          }
        }, new Set<string>())
      );
      setRecipes(recipeIds.reduce((acc, e) => ({...acc, [e]: original[e]}), {} as typeof original));
    }

  }
}
