"use client";

import { Divider } from "antd";
import React from "react";
import { CourseOptionsProvider } from "./context";
import CourseFilters from "./(components)/CourseFilters";
import CourseList from "./(components)/CourseList";


export default function Course() {
  return (
    <CourseOptionsProvider>
      <CourseFilters/>
      <Divider/>
      <CourseList/>
    </CourseOptionsProvider>
  );
}
