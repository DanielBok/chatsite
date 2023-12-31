import { Divider, Image, List } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNinjaCookbookContext } from "../context";
import RecipeStatistics from "./RecipeStatistics";


export default function RecipeList() {
  const {recipes} = useNinjaCookbookContext();

  return (
    <>
      <Divider className="text-xl mb-8" orientation="left">Recipes</Divider>
      <List
        itemLayout="vertical"
        size="large"
        grid={{gutter: 6, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3}}
        dataSource={Object.values(recipes)}
        renderItem={(item, index) => (
          <List.Item
            key={index}
            className="w-full flex justify-between p-4 shadow shadow-gray-400"
          >
            <Link
              to={item.id}
              className="flex flex-col w-full mr-4 cursor-pointer">
              <h2 className="text-lg md:text-2xl md:h-20">{item.name}</h2>
              <div className="flex-grow"/>
              <RecipeStatistics
                timing={item.timing}
                difficulty={item.difficulty}
                servings={item.servings}
              />
            </Link>

            <div className="flex items-center">
              <Image src={item.image} className="w-[125px] md:w-[200px] md:max-h-[70px] rounded shadow"/>
            </div>
          </List.Item>
        )}
      />
    </>
  );
}
