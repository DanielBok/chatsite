import classNames from "classnames";
import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";


type Props = React.PropsWithChildren<{
  text: string
  className?: string
  onDelete?: (text: string) => void
}>

export default function Badge({className, text, onDelete}: Props) {
  return (
    <span
      className={classNames("flex items-center text-white justify-center",
        "rounded-full mr-1 mb-1 py-1.5 px-3 text-xs",
        className)}
    >
      <span>{text}</span>
      {onDelete && (
        <span
          onClick={onDeleteClick}
          className="ml-4 text-white text-md cursor-pointer"
        >
          <RiDeleteBin5Line/>
        </span>
      )}
    </span>

  );

  function onDeleteClick() {
    onDelete!(text);
  }
}
