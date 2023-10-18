import { useCourseOptions } from "@/app/course/context";
import { Course } from "@/app/course/types";
import { useUser } from "@/store/account/hooks";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import InfoModal from "../InfoModal";

type Props = {
  course: Course;
}


export default function CourseInfo({course}: Props) {
  const user = useUser()!;
  const {setModal, setCourse} = useCourseOptions();

  const actions = user.isAdmin ? [
    <div key="edit" className="w-full">
      <EditOutlined key="edit"/>,
    </div>,
    <DeleteOutlined key="delete"/>,
  ] : undefined;

  return (
    <>
      <Card
        title={`${course.location}: ${course.course}`}
        actions={actions}
        hoverable={true}
        onClick={onCardClick}
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
      <InfoModal/>
    </>
  );

  function onCardClick() {
    setCourse(course);
    setModal("info");
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
}


