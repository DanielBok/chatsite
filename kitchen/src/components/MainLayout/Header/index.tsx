import { APP_NAME } from "@/constants";
import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import CatLogo from "./cat-logo.webp";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <div className="h-20 sticky z-10 top-0 bg-white border-b-gray-400 border-b shadow-xl">
      <div className="p-4 flex">
          <Link to="/" className="cursor-pointer flex align-middle">
            <Image src={CatLogo} alt="Cat Logo" height={56} width={56} preview={false}/>
            <div className="ml-2 font-bold text-2xl text-gray-700 hover:text-gray-400 items-center hidden md:flex">
              {APP_NAME}
            </div>
          </Link>

        <MobileHeader/>
        <WebHeader/>
      </div>
    </div>
  );
}
