import { Divider } from "antd";
import React from "react";
import CourseFilters from "./(components)/CourseFilters";
import CourseList from "./(components)/CourseList";


export default function Course() {
  return (
    <>
      <CourseFilters/>
      <Divider/>
      <CourseList/>
    </>
  );
}
