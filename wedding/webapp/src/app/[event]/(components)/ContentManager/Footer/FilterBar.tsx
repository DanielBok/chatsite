"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import React from "react";


export default function FilterBar() {
  const {tagFilter, setTagFilter} = useContentManagerContext();

  return (
    <div className="flex justify-center items-center w-full">
      <div className="min-w-[200px] max-w-[60%]">
        <input
          value={tagFilter}
          onChange={e => setTagFilter(e.target.value)}
          className="input input-bordered min-w-[200px] md:min-w-[500px]"
          placeholder="Tag filters"
        />
      </div>
    </div>
  );
}
