import { Image, List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNinjaCookbookContext } from "../context";
import RecipeStatistics from "./RecipeStatistics";


export default function RecipeList() {
  const {recipes} = useNinjaCookbookContext();

  return (
    <List
      itemLayout="vertical"
      size="large"
      dataSource={recipes}
      bordered
      renderItem={(item, index) => (
        <List.Item
          key={index}
          className="w-full flex justify-between p-4"
        >
          <Link
            to={`${item.id}`}
            className="flex flex-col w-full mr-4 cursor-pointer">
            <h2 className="text-lg md:text-2xl">{item.name}</h2>
            <div className="flex-grow"/>
            <RecipeStatistics
              timing={item.timing}
              difficulty={item.difficulty}
              servings={item.servings}
            />
          </Link>

          <div className="flex items-center">
            <Image src={item.image} className="w-[175px] md:w-[250px] rounded shadow"/>
          </div>
        </List.Item>
      )}
    />
  );
}
