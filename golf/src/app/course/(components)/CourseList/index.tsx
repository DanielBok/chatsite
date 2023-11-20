import { useCourses } from "@/store/course/hooks";
import { List } from "antd";
import React from "react";
import CourseInfo from "./CourseInfo";


export default function CourseList() {
  const courses = useCourses();

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
      dataSource={Object.values(courses)}
      renderItem={(course) => (
        <List.Item>
          <CourseInfo course={course}/>
        </List.Item>
      )}
    />
  );
}
