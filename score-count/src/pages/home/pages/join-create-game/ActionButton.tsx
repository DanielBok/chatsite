import cx from "classnames";
import React, { DOMAttributes } from "react";

type Props = React.PropsWithChildren<{
  className: String
  onClick?: DOMAttributes<HTMLButtonElement>["onClick"]
}>;

export default function ActionButton({className, children, onClick}: Props) {
  const classes = cx(className,
    "bg-transparent font-semibold hover:text-white py-2 px-4 border hover:border-transparent rounded cursor-pointer");

  return (
    <button
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
