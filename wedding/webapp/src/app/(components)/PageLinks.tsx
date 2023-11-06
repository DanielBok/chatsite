import { PageSetup } from "@/lib/pages";
import Link from "next/link";
import React from "react";


export default function PageLinks() {
  return (
    <div className="bg-white p-4 rounded opacity-50">
      <div className="text-xl font-black underline">
        Gallery
      </div>
      <div className="flex items-center justify-center flex-col md:flex-row">
        {PageSetup.map(x => (
          <Link
            href={x.path}
            key={x.path}
            className="m-2 p-2 text-base text-gray-800 hover:underline transition duration-300 hover:text-emerald-600 font-bold">
            {x.desc}
          </Link>
        ))}
      </div>
    </div>
  );
}
