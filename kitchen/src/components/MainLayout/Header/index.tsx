import { APP_NAME } from "@/constants";
import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import CatLogo from "./cat-logo.jpg";

export default function Header() {
  return (
    <div className="h-24 sticky z-10 top-0 bg-[#fee26d] border-b-[#fee26d] border-b shadow-xl">
      <div className="p-4 flex">
        <div>
          <Link to="/" className="cursor-pointer flex align-middle">
            <Image src={CatLogo} alt="Cat Logo" height={64} width={64} preview={false}/>
            <div className="ml-4 font-bold text-3xl text-gray-700 hover:text-gray-400 flex items-center">
              {APP_NAME}
            </div>
          </Link>
        </div>
        <div className="flex-1 ml-8 mr-4 flex items-center">
          Menu
        </div>
      </div>
    </div>
  );
}
