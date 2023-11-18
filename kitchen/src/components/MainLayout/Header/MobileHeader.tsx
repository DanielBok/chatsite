import { MenuFoldOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-row-reverse md:hidden items-center">
        <MenuFoldOutlined
          className="text-xl text-blue-500"
          onClick={() => setMenuOpen(true)}
        />
      </div>
      <Drawer
        title={<div className="font-bold text-md">Kitchen</div>}
        placement="right"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        width="80%"
      >
        <Link to="/cookbook" className="hover:text-blue-400">
          Cookbook
        </Link>
      </Drawer>
    </>
  );
}
