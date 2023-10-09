import { useAuth } from "@/context/auth-context";
import { DownOutlined, UserOutlined, } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

export default function AccountHandler() {
  const {user, signOut} = useAuth();

  if (!user) {
    redirect("/account/login");
  }

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
        {user.imagePath && <Image src={user.imagePath}
                                  className="mr-2"
                                  alt=""
                                  width={32}
                                  height={32}/>}
        <div>{user.name}</div>
        <DownOutlined className="ml-1 text-sm"/>
      </div>
    </Dropdown>
  );
}
