import { useAppDispatch } from "@/store";
import { deleteCourse } from "@/store/course/thunks";
import { DeleteOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React, { useState } from "react";

type Props = {
  courseId: number;
}

export default function DeleteCourse({courseId}: Props) {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="text-rose-500 hover:text-rose-700" onClick={() => setOpen(true)}>
        <DeleteOutlined key="delete"/> Delete
      </div>
      <Modal
        open={open}
        maskClosable
        width={400}
        onCancel={() => setOpen(false)}
        title={<div className="text-rose-800 font-bold">Are you sure?</div>}
        onOk={() => dispatch(deleteCourse(courseId))}
        okButtonProps={{
          className: "bg-rose-600 text-white hover:bg-rose-800"
        }}
        okText="Yes"
      >
        <p>Once you remove the course, it's lost forever!</p>
        <p>Do you actually want to switch this course to <b>Inactive</b>?</p>
      </Modal>
    </>
  );
}
