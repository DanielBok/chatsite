import classNames from "classnames";
import React from "react";

type Props = {
  className?: string
}

export default function Separator({className}: Props) {
  return (
    <span className={classNames("border-l-black border-l", className)}/>
  );
}
