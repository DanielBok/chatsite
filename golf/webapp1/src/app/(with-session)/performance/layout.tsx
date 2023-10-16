"use client";

import { PerformanceOptionsProvider, usePerfOptions } from "@/app/(with-session)/context";
import { useAuth } from "@/context/auth-context";
import { Divider, Radio } from "antd";
import React from "react";

export default function Layout({children}: React.PropsWithChildren) {
  const {name} = useAuth().user!;
  return (
    <PerformanceOptionsProvider>
      <div className="text-lg font-bold">{name}'s Performance</div>
      <Divider/>
      <Filters/>

      {children}
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