import { PageSetup } from "@/lib/pages";
import classNames from "classnames";
import Link from "next/link";
import React from "react";


export default function PageLinks() {
  return (
    <div className="flex items-center justify-center">
      {PageSetup.map(x => (
        <Link href={x.path} key={x.path} className="m-1">
          <button className={classNames("btn", x.className)}>
            {x.desc}
          </button>
        </Link>
      ))}
    </div>
  );
}
