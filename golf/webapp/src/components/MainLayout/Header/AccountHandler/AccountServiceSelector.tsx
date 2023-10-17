import { useUser } from "@/store/account/hooks";
import { AndroidOutlined, DownOutlined, UserOutlined, } from "@ant-design/icons";
import { Dropdown, Image, MenuProps } from "antd";
import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";


function AccountServiceSelector() {
  const user = useUser()!;
  const items: MenuProps["items"] = [
    {
      label: (
        <Link to="/account/manage">Manage Account</Link>
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
    <>
      {user.imagePath && <Image src={user.imagePath}
                                preview={{
                                  maskClassName: 'rounded-full',
                                }}
                                className="rounded-full cursor-pointer"
                                alt=""
                                width={32}
                                height={32}/>}
      <Dropdown menu={{items}}>
        <div className={classNames(
          "ml-2 text-bold text-lg cursor-pointer border-b-white border-b p-1 items-center flex",
          "hover:text-gray-300 hover:border-b-gray-300",
        )}>
          <div>{user.name}</div>
          <DownOutlined className="ml-1 text-sm"/>
        </div>
      </Dropdown>
    </>
  );

  function signOut() {

  }
}

export default AccountServiceSelector;
