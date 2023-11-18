import { StarFilled, StarOutlined } from "@ant-design/icons";
import React from "react";

type Props = {
  level: number
  maxLevel?: number
}

export default function Difficulty({level, maxLevel = 3}: Props) {
  maxLevel = Math.max(level, maxLevel);

  const stars = [];
  for (let i = 0; i < level; i++) {
    stars.push(StarFilled);
  }
  for (let i = 0; i < maxLevel - level; i++) {
    stars.push(StarOutlined);
  }

  return (
    <div className="flex flex-row items-center">
      <div className="mr-2 font-bold text-sm">Level:</div>
      <div className="flex">
        {stars.map((Icon, index) => <Icon key={index} className="text-sm"/>)}
      </div>
    </div>
  );
}
