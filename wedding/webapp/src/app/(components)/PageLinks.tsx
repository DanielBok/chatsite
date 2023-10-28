import { PageSetup } from "@/lib/pages";
import Link from "next/link";
import React from "react";


export default function PageLinks() {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white opacity-50 rounded p-4">
        {PageSetup.map(x => (
          <Link
            href={x.path}
            key={x.path}
            className="m-4 p-2 font-bold font-lg underline text-blue-800">
            {x.desc}
          </Link>
        ))}
      </div>
    </div>
  );
}
