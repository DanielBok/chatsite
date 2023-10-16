"use client";
import { Course } from "@/app/(with-session)/course/types";
import React, { createContext, useContext, useState } from "react";


export type CourseFilters = {
  country: string;
  status: ("Active" | "Inactive")[]
}


type CourseOptionsContextType = {
  modal: "info" | "edit" | null;
  setModal: (v: CourseOptionsContextType["modal"]) => void;
  course: Course | null;
  setCourse: (v: Course | null) => void;
  filters: CourseFilters;
  setFilters: (f: Partial<CourseFilters>) => void;
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
  const [course, setCourse] = useState<CourseOptionsContextType["course"]>(null);
  const [modal, setModal] = useState<CourseOptionsContextType["modal"]>(null);
  const [filters, _setFilters] = useState<CourseFilters>({country: "", status: []});

  return <CourseOptionsContext.Provider value={{filters, setFilters, modal, setModal, course, setCourse}}>
    {children}
  </CourseOptionsContext.Provider>;

  function setFilters(f: Partial<CourseFilters>) {
    _setFilters(v => ({...v, ...f}));
  }
}
