import { useUser } from "@/store/account/hooks";
import { Divider, Radio } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import { PerformanceOptionsProvider, usePerfOptions } from "./context";

export default function PerformanceLayout() {
  const {name} = useUser()!;
  return (
    <PerformanceOptionsProvider>
      <div className="text-lg font-bold">{name}'s Performance</div>
      <Divider/>
      <Filters/>

      <Outlet/>
    </PerformanceOptionsProvider>
  );
}

function Filters() {
  const {metric, setMetric} = usePerfOptions();

  return (
    <div className="flex items-center mb-4">
      <div className="text-sm mr-2">Distance Metric:</div>
      <Radio.Group
        defaultValue={metric}
        onChange={(v) => setMetric(v.target.value)}>
        <Radio.Button value="meter">Meters</Radio.Button>
        <Radio.Button value="yard">Yards</Radio.Button>
      </Radio.Group>
    </div>
  );
}