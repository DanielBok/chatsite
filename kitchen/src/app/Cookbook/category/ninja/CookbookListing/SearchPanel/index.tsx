import { RightOutlined } from "@ant-design/icons";
import { Collapse } from "antd";
import React from "react";
import SearchByIngredientsInput from "./SearchByIngredientsInput";
import SearchByNameInput from "./SearchByNameInput";


export default function SearchPanel() {
  return (
    <Collapse
      ghost
      bordered={false}
      size="small"
      expandIcon={({isActive}) => {
        return <div className="flex items-center h-full text-lg mt-2">
          <RightOutlined rotate={isActive ? 90 : 0}/>
        </div>;
      }}
      items={[{
        key: "filter",
        label: <div className="flex text-xl mb-8 items-center">Search</div>,
        children: (
          <div className="flex flew-col md:flex-row">
            <SearchByNameInput/>
            <SearchByIngredientsInput/>
          </div>
        )
      }]}
      defaultActiveKey="filter"
    />
  );
}
