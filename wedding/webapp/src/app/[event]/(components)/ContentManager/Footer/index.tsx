import FilterBar from "./FilterBar";
import ModeSelector from "./ModeSelector";
import React from "react";


export default function Footer() {
  return (
    <div className="w-full fixed left-0 bottom-0 bg-neutral-200 p-2">
      <div className="flex justify-between">
        <div/>
        <FilterBar/>
        <ModeSelector/>
      </div>
    </div>
  );
}
