import { ScalarRange } from "@/app/Cookbook/category/ninja/recipes/types";
import { Space } from "antd";
import classNames from "classnames";
import React from "react";

type Props = {
  title: React.ReactNode
  value: ScalarRange | string
  units: React.ReactNode
  className?: string
}

export default function ScalarRangeItem({title, value, units, className}: Props) {
  return (
    <div className={classNames("flex flex-row items-center text-sm", className)}>
      <div className="mr-1">
        {typeof title === "string" ? (
          <div className="font-bold whitespace-nowrap">{title}</div>
        ) : title}
      </div>
      <Value/>
    </div>
  );

  function Value() {

    return (
      <Space className="flex flex-nowrap whitespace-nowrap" direction="horizontal" size={2}>
        {getValue()} {typeof value !== "string" && <>{units}</>}
      </Space>
    );


    function getValue() {
      if (typeof value === "string") {
        return value.trim();
      } else if (typeof value === "number") {
        return `${value}`;
      } else {
        return `${value.min} - ${value.max}`;
      }
    }
  }
}
