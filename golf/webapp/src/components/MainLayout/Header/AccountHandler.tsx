import { useAuth, User, withUserSession } from "@/context/auth-context";
import { AndroidOutlined, DownOutlined, UserOutlined, } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  user: User;
}

function AccountHandler({user}: Props) {
  const {signOut} = useAuth();

  const items: MenuProps["items"] = [
    {
      label: (
        <Link href="/account/manage">Manage Account</Link>
      ),
      icon: <AndroidOutlined/>,
      key: "manage",
    },
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

export default withUserSession()(AccountHandler);
