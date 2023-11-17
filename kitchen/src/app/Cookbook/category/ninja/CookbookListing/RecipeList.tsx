import { Image, List, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { useNinjaCookbookContext } from "../context";
import Difficulty from "./Difficulty";
import ScalarRangeItem from "./ScalarRangeItem";


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
            <h2 className="text-2xl">{item.name}</h2>
            <div className="flex-grow">
            </div>

            <div className="flex flex-row">
              <Space size={6}>
                <Difficulty level={item.difficulty}/>
                <Separator/>
                <ScalarRangeItem title="Serves:" value={item.servings} units="pax"/>
                <Separator/>
                <ScalarRangeItem title="Cook Time: " value={item.timing.total} units="mins"/>
              </Space>
            </div>
          </Link>

          <div>
            <Image src={item.image} width={250}/>
          </div>
        </List.Item>
      )}
    />
  );
}

const Separator = () => (
  <span className="border-l-black h-full border-l-2 p-0.5"/>
);