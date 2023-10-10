import classNames from "classnames";
import React from "react";

type Props = {
  Icon: React.FC;
  selected?: boolean;
}

export default function MenuLabel({children, Icon, selected = false}: React.PropsWithChildren<Props>) {
  if (typeof children === "string") {
    children = <span>{children}</span>;
  }

  return (
    <div className={classNames(
      "text-white flex items-center text-lg",
      selected
        ? "border-b-amber-400 border-b-4 text-amber-400"
        : "hover:text-amber-200 hover:border-b-amber-200 hover:border-b-2"
    )}>
      <Icon/>
      {children}
    </div>
  );
}
