import { Course } from "@/app/course/types";
import React, { createContext, useContext, useState } from "react";

export type CourseStatus = "Active" | "Inactive";

export type CourseFiltersProp = {
  country: string
  status: CourseStatus[]
}


type CourseOptionsContextType = {
  modal: "info" | "edit" | null
  setModal: (v: CourseOptionsContextType["modal"]) => void
  course: Course | null
  setCourse: (v: Course | null) => void
  filters: CourseFiltersProp
  setFilters: (f: Partial<CourseFiltersProp>) => void
}

const CourseOptionsContext = createContext<CourseOptionsContextType>({
  course: null,
  setCourse: () => {
  },
  modal: null,
  setModal: () => {
  },
  filters: {country: "", status: []},
  setFilters: () => {
  }
});

export const useCourseOptions = () => useContext(CourseOptionsContext);

export function CourseOptionsProvider({children}: React.PropsWithChildren) {
  const status: CourseStatus[] = ["Active", "Inactive"];
  const [course, setCourse] = useState<CourseOptionsContextType["course"]>(null);
  const [modal, setModal] = useState<CourseOptionsContextType["modal"]>(null);
  const [filters, _setFilters] = useState<CourseFiltersProp>({country: "", status});

  return <CourseOptionsContext.Provider
    value={{filters, setFilters, modal, setModal, course, setCourse}}>
    {children}
  </CourseOptionsContext.Provider>;

  function setFilters(f: Partial<CourseFiltersProp>) {
    _setFilters(v => ({...v, ...f}));
  }
}
