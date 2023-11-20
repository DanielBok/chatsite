import { DistanceMetric } from "@/store/course/types";
import React, { createContext, useContext, useState } from "react";


type PerformanceOptions = {
  metric: DistanceMetric;
  setMetric: (v: DistanceMetric) => void;
}

const PerformanceOptionsContext = createContext<PerformanceOptions>({
  metric: "meter",
  setMetric: () => {

  }
});

export const usePerfOptions = () => useContext(PerformanceOptionsContext);

export const PerformanceOptionsProvider = ({children}: React.PropsWithChildren) => {
  const [metric, setMetric] = useState<DistanceMetric>("meter");

  return (
    <PerformanceOptionsContext.Provider value={{metric, setMetric}}>
      {children}
    </PerformanceOptionsContext.Provider>
  );
};