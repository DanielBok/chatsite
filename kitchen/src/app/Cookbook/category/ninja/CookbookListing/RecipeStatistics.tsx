import Difficulty from "@/app/Cookbook/category/ninja/(components)/Difficulty";
import ScalarRangeItem from "@/app/Cookbook/category/ninja/(components)/ScalarRangeItem";
import Separator from "@/app/Cookbook/category/ninja/(components)/Separator";
import { Recipe } from "@/app/Cookbook/category/ninja/recipes/types";
import { Space } from "antd";
import React from "react";

type Props = Pick<Recipe, "servings" | "difficulty" | "timing">


export default function RecipeStatistics({servings, difficulty, timing: {total}}: Props) {
  const components = [
    <Difficulty key={0} level={difficulty}/>,
    <ScalarRangeItem key={1} title="Serves:" value={servings} units="pax"/>,
    <ScalarRangeItem key={2} title="Cook Time: " value={total} units="mins"/>,
  ];

  return (
    <>
      <Space size={6} className="hidden md:flex flex-row">
        {components[0]}
        <Separator/>
        {components[1]}
        <Separator/>
        {components[2]}
      </Space>

      <div className="flex-col items-start md:hidden">
        {components}
      </div>
    </>
  );
}
