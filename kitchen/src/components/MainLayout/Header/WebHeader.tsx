import { ExperimentOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";


export default function WebHeader() {
  const navigate = useNavigate();
  const {pathname} = useLocation();

  const menuItems: MenuProps["items"] = [
    {
      label: "Cookbook",
      key: "cookbook",
      icon: <ExperimentOutlined/>,
      children: [
        {
          label: "Recipe List",
          key: "/cookbook",
        },
        {
          label: "Add Recipe",
          key: "/cookbook/add",
        },
      ]
    },
  ];

  const [selected, setSelected] = useState(searchCurrentKey(pathname, menuItems));

  return (
    <div className="flex-1 ml-8 mr-4 items-center hidden md:flex flex-row-reverse">
      <div className="flex flex-row text-md px-12">
        <Menu
          onClick={({key}) => {
            setSelected(key);
            if (key.startsWith("/")) {
              navigate(key);
            }
          }}
          selectedKeys={[selected]}
          mode="horizontal"
          items={menuItems}/>
      </div>
    </div>
  );
}

function searchCurrentKey(pathname: string, menuItems: MenuProps["items"]): string {
  return menuItems!.reduce((currentKey, item) => {
    if (currentKey.length > 0) {
      return currentKey;
    }

    const key = item!.key as string;

    if (key === pathname) {
      return key;
    }

    const children = (item as any).children || [];
    if (children.length > 0) {
      return searchCurrentKey(pathname, children);
    }

    return currentKey;
  }, "");
}