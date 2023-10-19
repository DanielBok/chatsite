import DeleteCourse from "@/app/course/(components)/CourseList/DeleteCourse";
import { useUser } from "@/store/account/hooks";
import { Course } from "@/store/course/types";
import { EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import CourseInfoZoom from "./CourseInfoZoom";

type Props = {
  course: Course;
}


export default function CourseInfo({course}: Props) {
  const {isAdmin} = useUser()!;

  const actions = [
    <CourseInfoZoom {...course}/>
  ];

  if (isAdmin) {
    actions.push(
      <div className="text-amber-500 hover:text-amber-700">
        <EditOutlined key="edit"/> Edit
      </div>,
      <DeleteCourse courseId={course.id}/>
    );
  }

  return (
    <Card
      title={`${course.location}: ${course.course}`}
      actions={actions}
      hoverable={true}
      className="cursor-default"
    >
      <div className="flex flex-col">
        {[
          {field: "Country", value: course.country},
          {field: "Website", value: course.website, isLink: true},
        ].map(({field, value, isLink}) => (
            <Info key={field} field={field} value={value} isLink={isLink}/>
          )
        )}
      </div>
    </Card>
  );
}

function Info({field, value, isLink = false}: {
  field: React.ReactNode,
  value: React.ReactNode,
  isLink?: boolean
}) {
  return <div className="flex items-center">
    <div className="w-[50px] font-bold min-w-[75px]">{field}</div>
    <div className="flex-1">
      {isLink
        ? <Link to={value as string} className="text-blue-400 hover:text-blue-800">{value}</Link>
        : value}
    </div>
  </div>;
}


