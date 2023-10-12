"use client";

import CourseInfo from "@/app/(with-session)/course/(components)/CourseList/CourseInfo";
import { Course } from "@/app/(with-session)/course/types";
import { makeUrl } from "@/lib/api";
import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCourseOptions } from "../../context";


export default function CourseList() {
  const {filters: {status, country}} = useCourseOptions();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!country || status.length === 0) {
      return;
    }
    const active = status.length === 2 ? undefined : status[0] === "Active";
    axios.post<Course[]>(makeUrl("course"), {active, country})
      .then(({data}) => setCourses(data));
  }, [country, status]);

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 4,
      }}
      dataSource={courses}
      renderItem={(course) => (
        <List.Item>
          <CourseInfo course={course}/>
        </List.Item>
      )}
    />
  );
}
