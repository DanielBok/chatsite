import { APP_NAME } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import AccountHandler from "./AccountHandler";
import CatLogo from "./cat-logo.png";
import ServiceSelector from "./ServiceSelector";


export default function Header() {
  return (
    <div className="h-24 sticky z-10 top-0 bg-teal-600 border-b-gray-400 border-b shadow-xl">
      <div className="p-4 text-white flex">
        <div>
          <Link href="/" className="cursor-pointer flex align-middle">
            <Image src={CatLogo} alt="Cat Logo" height={64} width={64}/>
            <div className="ml-4 font-bold text-3xl text-white hover:text-gray-100 flex items-center">
              {APP_NAME}
            </div>
          </Link>
        </div>
        <div className="flex-1 ml-8 mr-4 flex items-center">
          <ServiceSelector/>
        </div>
        <div className="flex justify-end items-center h-full">
          <AccountHandler/>
        </div>
      </div>
    </div>
  );
}
