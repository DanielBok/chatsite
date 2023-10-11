"use client";
import React, { createContext, useContext, useState } from "react";


export type CourseFilters = {
  country: string;
  status: ('Active' | 'Inactive')[]
}


type CourseFilterContextType = {
  filters: CourseFilters;
  setFilters: (f: Partial<CourseFilters>) => void;
}

const CourseFilterContext = createContext<CourseFilterContextType>({
  filters: {country: "", status: []},
  setFilters: () => {
  }
});

export const useCourseFilter = () => useContext(CourseFilterContext);

export function CourseFilterProvider({children}: React.PropsWithChildren) {
  const [filters, _setFilters] = useState<CourseFilters>({country: "", status: []});

  return <CourseFilterContext.Provider value={{filters, setFilters}}>
    {children}
  </CourseFilterContext.Provider>;

  function setFilters(f: Partial<CourseFilters>) {
    _setFilters(v => ({...v, ...f}));
  }
}


