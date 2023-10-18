import { useCourseOptions } from "@/app/course/context";
import { Course } from "@/app/course/types";
import { List } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CourseInfo from "./CourseInfo";


export default function CourseList() {
  const {filters: {status, country}} = useCourseOptions();
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (!country || status.length === 0) {
      return;
    }

    const controller = new AbortController();

    axios.post<Course[]>(
        "course",
        {
          active: status.length === 2 ? undefined : status[0] === "Active",
          country
        },
        {signal: controller.signal})
      .then(({data}) => {
        setCourses(data);
      });

    return () => controller.abort();

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
