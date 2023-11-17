import { ScalarRange } from "@/app/Cookbook/category/ninja/recipes/types";
import React from "react";

type Props = {
  title: React.ReactNode
  value: ScalarRange
  units: string
}

export default function ScalarRangeItem({title, value, units}: Props) {
  return (
    <div className="flex flex-row">
      <div className="mr-2">
        {typeof title === "string" ? (
          <div className="text-sm font-bold">{title}</div>
        ) : title}
      </div>
      {typeof value === "number" ? (
        <>{value} {units}</>
      ) : (
        <>{value.min} - {value.max} {units}</>
      )}
    </div>
  );
}
