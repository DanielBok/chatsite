import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
  icon: React.ReactNode;
  linkTo: string
  selected?: boolean;
}

export default function MenuLabel({children, icon, linkTo, selected = false}: React.PropsWithChildren<Props>) {
  if (typeof children === "string") {
    children = <span>{children}</span>;
  }

  return (
    <Link to={linkTo}>
      <div className={classNames(
        "text-white flex items-center text-lg",
        selected
          ? "border-b-amber-400 border-b-4 text-amber-400"
          : "hover:text-amber-200 hover:border-b-amber-200 hover:border-b-2"
      )}>
        {icon}
        {children}
      </div>
    </Link>
  );
}
