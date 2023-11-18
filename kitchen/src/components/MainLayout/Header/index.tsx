import { APP_NAME } from "@/constants";
import React from "react";
import { Image } from "antd";
import { Link } from "react-router-dom";
import CatLogo from "./cat-logo.jpg";
import WebHeader from "./WebHeader";
import MobileHeader from "./MobileHeader";

export default function Header() {
  return (
    <div className="h-24 sticky z-10 top-0 bg-[#fee26d] border-b-[#fee26d] border-b shadow-xl">
      <div className="p-4 flex">
        <div>
          <Link to="/" className="cursor-pointer flex align-middle">
            <Image src={CatLogo} alt="Cat Logo" height={64} width={64} preview={false}/>
            <div className="ml-4 font-bold text-3xl text-gray-700 hover:text-gray-400 items-center hidden md:flex">
              {APP_NAME}
            </div>
          </Link>
        </div>

        <MobileHeader/>
        <WebHeader/>
      </div>
    </div>
  );
}
