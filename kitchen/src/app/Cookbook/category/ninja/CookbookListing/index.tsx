import { Space } from "antd";
import React from "react";
import RecipeList from "./RecipeList";
import SearchPanel from "./SearchPanel";


export default function CookbookListing() {
  return (
    <Space direction="vertical" size={24} className="w-full flex flex-col">
      <SearchPanel/>
      <RecipeList/>
    </Space>
  );
}

