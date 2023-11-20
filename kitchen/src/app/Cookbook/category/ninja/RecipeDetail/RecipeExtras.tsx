import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import classNames from "classnames";
import React from "react";

type Props = Pick<Recipe, "extra"> & {
  className?: string
}

export default function RecipeExtras({extra, className}: Props) {
  if (!extra) return null;

  return (
    <>
      {Object.entries(extra).map(([name, items]) => (
        <Extra name={name} items={items} key={name} className={className}/>
      ))}
    </>
  );
}

type ExtraProps = {
  name: string
  items: string[]
  className?: string
}


const Extra = ({name, items, className}: ExtraProps) => {
  return (
    <div className={classNames("flex flex-col p-2", className)}>
      <div className="text-lg font-bold underline mb-4">{name}</div>
      <ol className="pl-2 ml-4 marker:font-black">
        {items.map((e, index) => (
          <li key={index} className="list-disc pl-4">{e}</li>
        ))}
      </ol>
    </div>
  );
};