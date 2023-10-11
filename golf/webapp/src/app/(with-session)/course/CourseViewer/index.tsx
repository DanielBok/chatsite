"use client";

import CourseList from "@/app/(with-session)/course/CourseViewer/CourseList";
import { Divider } from "antd";
import React from "react";
import { CourseFilterProvider } from "./context";
import CourseFilters from "./CourseFilters";


export default function CourseViewer() {
  return (
    <CourseFilterProvider>
      <CourseFilters/>
      <Divider/>
      <CourseList/>
    </CourseFilterProvider>
  );
}
