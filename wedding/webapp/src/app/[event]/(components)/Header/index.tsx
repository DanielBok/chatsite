import { EventType, PageSetup } from "@/lib/pages";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./cat-logo.jpeg";

type Props = {
  event?: EventType
}

export default function Header({event}: Props) {
  return (
    <div className="navbar bg-white mb-3 shadow-lg">
      <div className="justify-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost sm:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"/>
            </svg>
          </label>
          <ul tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {PageSetup.map(e => (
              <li key={e.path} className={e.key === event ? "text-teal-600 font-bold" : undefined}>
                <Link href={e.path}>
                  {e.desc}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Link href="/">
          <div className="flex items-center w-max">
            <Image src={Logo} alt="logo" className="rounded-full mr-2" width={48} height={48}/>
            <div className="text-xl font-bold">Priscilla and Daniel</div>
          </div>
        </Link>
      </div>
      <div className="justify-start hidden sm:flex">
        <ul className="ml-2 menu menu-horizontal px-1">
          {PageSetup.map(e => (
            <li key={e.path} className={e.key === event ? "text-teal-600 border-b-teal-600 border-b-2 font-bold" : undefined}>
              <Link href={e.path}>
                {e.desc}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
