import { Space } from "antd";
import React from "react";
import RecipeList from "./RecipeList";


export default function CookbookListing() {
  return (
    <Space direction="vertical" size={10} className="w-full flex flex-col">
      <RecipeList/>
    </Space>
  );
}

