import { APP_NAME } from "@/constants";
import React from "react";
import { Link } from "react-router-dom";
import AccountHandler from "./AccountHandler";
import CatLogo from "./cat-logo.png";
import ServiceSelector from "./ServiceSelector";
import { Image } from "antd";

export default function Header() {
  return (
    <div className="h-24 sticky z-10 top-0 bg-teal-600 border-b-gray-400 border-b shadow-xl">
      <div className="p-4 text-white flex">
        <div>
          <Link to="/" className="cursor-pointer flex align-middle">
            <Image src={CatLogo} alt="Cat Logo" height={64} width={64}/>
            <div className="ml-4 font-bold text-3xl text-white hover:text-gray-100 flex items-center">
              {APP_NAME}
            </div>
          </Link>
        </div>
        <div className="flex-1 ml-8 mr-4 flex items-center">
          <ServiceSelector/>
        </div>
        <div className="flex justify-end items-center h-auto">
          <AccountHandler/>
        </div>
      </div>
    </div>
  );
}
