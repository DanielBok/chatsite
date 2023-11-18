import Difficulty from "@/app/Cookbook/category/ninja/(components)/Difficulty";
import ScalarRangeItem from "@/app/Cookbook/category/ninja/(components)/ScalarRangeItem";
import Separator from "@/app/Cookbook/category/ninja/(components)/Separator";
import { Recipe, ScalarRange, Timings } from "@/app/Cookbook/category/ninja/recipes/types";
import { GitlabFilled } from "@ant-design/icons";
import { Space } from "antd";
import React from "react";

type Props = Pick<Recipe, "difficulty" | "servings" | "timing">

const timingNameMap: Record<keyof Timings, string> = {
  prep: "PREP",
  cook: "COOK",
  airCrisp: "AIR CRISP",
  bakeRoast: "BAKE/ROAST",
  pressureCook: "PRESSURE COOK",
  pressureBuild: "PRESSURE BUILD",
  pressureRelease: "PRESSURE RELEASE",
  total: "TOTAL",
};

const timingKeys: (keyof Timings)[] = [
  "prep",
  "cook",
  "airCrisp",
  "bakeRoast",
  "pressureCook",
  "pressureBuild",
  "pressureRelease",
  "total",
];

export default function RecipeStatistics({
                                           difficulty, servings, timing
                                         }: Props) {
  const timingComponents = Object.entries(timing).reduce((acc, entries) => {
    const [key, value] = entries as [keyof Timings, number | ScalarRange];

    acc[key] = (typeof value === "number" && value === 0)
      ? null
      : (
        <ScalarRangeItem
          key={key}
          value={value}
          units="mins"
          title={timingNameMap[key]}
          className="text-xs"
        />
      );
    return acc;
  }, {} as Record<keyof Timings, React.ReactNode>);

  return (
    <div className="flex flex-col">
      <Space className="flex flex-row items-center mb-4" size={8} direction="horizontal">
        <Difficulty level={difficulty}/>
        <ScalarRangeItem
          title="Serves: "
          value={servings}
          units={<GitlabFilled className="text-sm"/>}
        />
      </Space>

      <Space className="flex flex-row flex-wrap" size={[12, 0]}>
        {timingKeys
          .filter(k => !!timingComponents[k])
          .map((k) =>
            k === "total" ? timingComponents[k] : (
              <>
                {timingComponents[k]}
                <Separator/>
              </>
            ))}
      </Space>

    </div>
  );
}
