"use client";

import { Divider } from "antd";
import React from "react";
import CourseFilters from "./(components)/CourseFilters";
import CourseList from "./(components)/CourseList";
import { CourseOptionsProvider } from "./context";


export default function Course() {
  return (
    <CourseOptionsProvider>
      <CourseFilters/>
      <Divider/>
      <CourseList/>
    </CourseOptionsProvider>
  );
}
