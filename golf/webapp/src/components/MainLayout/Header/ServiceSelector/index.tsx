import { useUser } from "@/store/account/hooks";
import { AuditOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import classNames from "classnames";
import React, { useState } from "react";
import { IoGolfOutline } from "react-icons/io5";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import MenuLabel from "./MenuLabel";


function ServiceSelector() {
  const user = useUser();
  const {pathname} = useLocation();
  const [menuKey, setMenuKey] = useState(pathname.split("/").find(x => x.length > 0) || "home");

  if (!user) {
    return null;
  }

  const menuItems: MenuProps["items"] = [
    {
      key: "home",
      label: (
        <MenuLabel
          icon={<HomeOutlined/>}
          selected={menuKey === "home"}
          linkTo="/"
        >
          Home
        </MenuLabel>
      )
    },
    {
      key: "performance",
      label: (
        <MenuLabel
          icon={<AuditOutlined/>}
          selected={menuKey.startsWith("performance")}
        >
          Performance
        </MenuLabel>
      ),
      children: [
        {
          label: <Link to="/performance/course">Course</Link>,
          key: "performance-course"
        },
        {
          label: <Link to="/performance/range">Range</Link>,
          key: "performance-range"
        },
      ]
    },
    user.isAdmin ? {
        key: "course",
        label: (
          <MenuLabel
            icon={<IoGolfOutline/>}
            selected={menuKey === "course"}
          >
            <span className="ml-2">Course</span>
          </MenuLabel>
        ),
        children: [
          {
            label: <Link to="/course">List courses</Link>,
            key: "course-list"
          },
          {
            label: <Link to="/course/add">Add Course</Link>,
            key: "course-add"
          }
        ]
      }
      : {
        key: "course",
        label: (
          <MenuLabel
            icon={<IoGolfOutline/>}
            selected={menuKey.startsWith("course")}
            linkTo="/course"
          >
            <span className="ml-2">Course</span>
          </MenuLabel>
        )
      },
  ];


  return (
    <Menu
      defaultSelectedKeys={[menuKey]}
      mode="horizontal"
      items={menuItems}
      className={
        classNames("bg-teal-600 text-white border-b-0 text-lg",
          "hover:text-white")
      }
      onSelect={({keyPath}) => {
        setMenuKey(keyPath[keyPath.length - 1]);
      }}
    />
  );
}


export default ServiceSelector;