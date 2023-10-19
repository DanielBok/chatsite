import { DeleteOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { Modal } from "antd";

type Props = {
  courseId: number;
}

export default function DeleteCourse({courseId}: Props) {
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
        onOk={removeCourse}
        okButtonProps={{
          className: "bg-rose-600 text-white hover:bg-rose-800"
        }}
        okText="Yes"
      >
        Once you remove the course, it's lost forever!
      </Modal>
    </>
  );

  function removeCourse() {
    console.log(courseId);
  }
}
