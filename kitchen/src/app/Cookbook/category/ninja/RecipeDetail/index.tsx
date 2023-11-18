import { useNinjaCookbookContext } from "@/app/Cookbook/category/ninja/context";
import { RollbackOutlined } from "@ant-design/icons";
import { Divider, Image, Space, Tooltip } from "antd";
import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import Directions from "./Directions";
import Ingredients from "./Ingredients";
import RecipeTips from "./RecipeTips";
import RecipeStatistics from "./Statistics";


export default function RecipeDetail() {
  const backAddress = useLocation().pathname.split("/").slice(0, -1).join("/");
  const recipeId = useParams<{ recipeId: Required<string> }>().recipeId!.toLowerCase();
  const recipe = useNinjaCookbookContext().recipes[recipeId];

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-row justify-between items-center my-4">
        <div className="font-bold text-3xl text-gray-700">{recipe.name}</div>
        <Tooltip title="Return">
          <Link to={backAddress}>
            <RollbackOutlined className="text-2xl cursor-pointer hover:scale-115 text-blue-700"/>
          </Link>
        </Tooltip>
      </div>

      <RecipeStatistics timing={recipe.timing}
                        servings={recipe.servings}
                        difficulty={recipe.difficulty}/>
      <Divider/>

      <Space direction="vertical" size={6} className="w-full flex flex-col items-center">

        <Space className="w-full flex flex-col md:hidden">
          <Ingredients ingredients={recipe.ingredients}/>
          <Directions directions={recipe.directions}/>
        </Space>

        <div className="w-full hidden md:flex flex-row justify-between">
          <Ingredients ingredients={recipe.ingredients} className="w-1/2"/>
          <Directions directions={recipe.directions} className="w-1/2"/>
        </div>

        <RecipeTips tips={recipe.tips}/>

        <Image
          src={recipe.image}
          preview={false}
          className="w-full rounded mt-4"
        />
      </Space>

    </div>
  );
}
