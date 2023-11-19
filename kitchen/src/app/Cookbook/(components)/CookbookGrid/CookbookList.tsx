import { Image, List, Space } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import links from "./links";


export default function CookbookList() {
  return (
    <List
      grid={{gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 4}}
      dataSource={links}
      renderItem={(item) => (
        <List.Item className="w-full p-3 md:p-4 shadow-md shadow-gray-400">
          <Link to={item.link}>
            <div className="flex flex-row justify-between">
              <Space className="flex flex-col justify-start md:min-h-0" direction="vertical" size={8}>
                <div className="text-lg font-bold">{item.source}</div>
                <div className="text-xs">{item.description}</div>
              </Space>
              <div className="ml-4 flex items-center">
                <Image
                  src={item.image}
                  preview={false}
                  className="max-w-[100px] max-h-[100px]"
                />
              </div>
            </div>
          </Link>
        </List.Item>
      )}
    />
  );
}
