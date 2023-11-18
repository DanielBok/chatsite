import { Divider } from "antd";
import React from "react";
import CookbookList from "./CookbookList";


export default function CookbookGrid() {
  return (
    <div className="my-4 md:p-4">
      <Divider className="mb-4 text-lg md:text-2xl font-bold">
        Cookbook
      </Divider>
      <CookbookList/>
    </div>
  );
}
