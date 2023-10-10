import { User, withUserSession } from "@/context/auth-context";
import { AuditOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { IoGolfOutline } from "react-icons/io5";
import MenuLabel from "./MenuLabel";


type Props = {
  user: User;
}

function ServiceSelector({user}: Props) {
  const [menuKey, setMenuKey] = useState("home");
  const items: {key: string, icon: React.FC, children: React.ReactNode}[] = [
    {key: "home", icon: HomeOutlined, children: "Home"},
    {key: "performance", icon: AuditOutlined, children: "Performance"},

  ];
  if (user.isAdmin) {
    items.push({key: "course", icon: IoGolfOutline, children: <span className="ml-2">Course</span>},);
  }

  const menuItems: MenuProps["items"] = items.map(({key, icon, children}) => ({
    key,
    label: <MenuLabel Icon={icon} selected={menuKey === key}>{children}</MenuLabel>
  }));


  return (
    <Menu
      defaultSelectedKeys={[menuKey]}
      mode="horizontal"
      items={menuItems}
      className={
        classNames("bg-teal-600 text-white border-b-0 text-lg",
          "hover:text-white")
      }
      onSelect={({key}) => {
        setMenuKey(key);
      }}
    />
  );
}


export default withUserSession({redirect: null})(ServiceSelector);