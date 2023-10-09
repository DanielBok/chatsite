import { useAuth } from "@/context/auth-context";
import { DownOutlined, UserOutlined, } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import React from "react";

export default function AccountHandler() {
  const {user, signOut} = useAuth();

  const items: MenuProps["items"] = [
    {
      type: "divider",
    },
    {
      label: (
        <div onClick={signOut}>Sign out</div>
      ),
      icon: <UserOutlined/>,
      key: "sign-out",
    }
  ];

  return (
    <Dropdown menu={{items}}>
      <div className={classNames(
        "text-bold text-lg cursor-pointer border-b-white border-b p-1 items-center flex",
        "hover:text-gray-300 hover:border-b-gray-300",
      )}>
        {user!.firstName}
        <DownOutlined className="ml-1 text-sm"/>
      </div>
    </Dropdown>
  );
}
