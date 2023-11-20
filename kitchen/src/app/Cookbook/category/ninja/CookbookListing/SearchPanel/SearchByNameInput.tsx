import { useNinjaCookbookContext } from "@/app/Cookbook/category/ninja/context";
import { AutoComplete } from "antd";
import React, { useState } from "react";


export default function SearchByNameInput() {
  const {recipes, setRecipes, original} = useNinjaCookbookContext();
  const originalOptions = Object.entries(recipes).map(([id, recipe]) => ({
    label: recipe.name, value: id
  }));
  const [options, setOptions] = useState(originalOptions);
  const [value, setValue] = useState("");

  return (
    <div className="w-full md:w-1/2 px-4">
      <AutoComplete
        value={value}
        options={options}
        onSearch={onSearch}
        onSelect={onSelect}
        placeholder="Recipe Name"
        className="w-full"
        allowClear
      />
    </div>
  );

  function onSearch(text: string) {
    setValue(text);
    text = text.trim().toLowerCase();

    if (!text) {
      setOptions(originalOptions);
      setRecipes(original);
    } else {
      const newOptions = originalOptions.filter(({label}) => label.toLowerCase().indexOf(text) >= 0);
      setOptions(originalOptions.filter(({label}) => label.toLowerCase().indexOf(text) >= 0));
      const newRecipes = newOptions.reduce((acc, {value: id}) => ({...acc, [id]: original[id]}), {} as typeof original);
      setRecipes(newRecipes);
    }
  }

  function onSelect(recipeId: string, {label}: (typeof originalOptions)[0]) {
    if (!recipeId) {
      setRecipes(original);
    } else {
      setValue(label);
      setRecipes({[recipeId]: recipes[recipeId]});
    }
  }
}
