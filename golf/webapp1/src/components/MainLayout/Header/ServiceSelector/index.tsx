import { User, withUserSession } from "@/context/auth-context";
import { AuditOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import classNames from "classnames";
import Link from "next/link";
import React, { useState } from "react";
import { IoGolfOutline } from "react-icons/io5";
import MenuLabel from "./MenuLabel";


type Props = {
  user: User;
}

function ServiceSelector({user: {isAdmin}}: Props) {
  const [menuKey, setMenuKey] = useState("home");
  const adminOnlyItems = new Set(["course"]);

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
          linkTo="/performance/course"
        >
          Performance
        </MenuLabel>
      ),
      children: [
        {
          label: <Link href="/performance/course">Course</Link>,
          key: "performance-course"
        },
        {
          label: <Link href="/performance/range">Range</Link>,
          key: "performance-range"
        },
      ]
    },
    {
      key: "course",
      label: (
        <MenuLabel
          icon={<IoGolfOutline/>}
          selected={menuKey.startsWith("course")}
          linkTo="/course"
        >
          <span className="ml-2">Course</span>
        </MenuLabel>
      ),
      children: [
        {
          label: <Link href="/course/add">Add Course</Link>,
          key: "course-add"
        },
      ]
    },
    // filter allows admin to see everything. Otherwise, remove admin only items
  ].filter(({key}) => isAdmin || !adminOnlyItems.has(key));


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