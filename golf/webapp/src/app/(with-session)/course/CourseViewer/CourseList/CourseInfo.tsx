"use client";

import { Course } from "@/app/(with-session)/course/types";
import { useAuth } from "@/context/auth-context";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Card } from "antd";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import InfoModal from "./InfoModal";

type Props = {
  course: Course;
}


export default function CourseInfo({course}: Props) {
  const user = useAuth().user!;
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const actions = user.isAdmin ? [
    <EditOutlined key="edit"/>,
    <DeleteOutlined key="delete"/>,
  ] : undefined;

  return (
    <>
      <Card
        title={`${course.location}: ${course.course}`}
        actions={actions}
        hoverable={true}
        onClick={() => setIsOpen(true)}
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
      <InfoModal course={course} isOpen={isOpen} closeModal={closeModal}/>
    </>
  );

  function Info({field, value, isLink = false}: {
    field: React.ReactNode,
    value: React.ReactNode,
    isLink?: boolean
  }) {
    return <div className="flex items-center">
      <div className="w-[50px] font-bold min-w-[75px]">{field}</div>
      <div className="flex-1">
        {isLink
          ? <Link href={value as string} className="text-blue-400 hover:text-blue-800">{value}</Link>
          : value}
      </div>
    </div>;
  }
}


