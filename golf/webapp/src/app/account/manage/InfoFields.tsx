import { BACKEND_BASE_URL } from "@/constants";
import { useAppDispatch } from "@/store";
import { useUser } from "@/store/account/hooks";
import { updateAccount } from "@/store/account/thunks";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd";
import { Button, Form, Input, notification, Upload } from "antd";
import classNames from "classnames";
import React from "react";


type FieldType = {
  username: string
  name: string
  image: {
    file: UploadFile
    fileList: UploadFile[]
  }
}

export default function InfoFields() {
  const {username, name} = useUser()!;
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  return (
    <>
      {contextHolder}
      <Form
        onFinish={updateUser}
        layout="vertical"
        className="w-full"
        form={form}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          initialValue={username}
        >
          <Input autoComplete="username"/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Name"
          name="name"
          initialValue={name}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="image"
          label="User Avatar"
          className="flex flex-col"
          valuePropName="filelist"
        >
          <Upload
            listType="picture"
            maxCount={1}
            action={`${BACKEND_BASE_URL}/healthcheck`}
          >
            <Button icon={<UploadOutlined/>}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item name="submit-user-details-change">
          <div>
            <Button
              htmlType="submit"
              type="primary"
              className="bg-teal-600 w-24"
            >
              Update
            </Button>
            <button
              className={classNames(
                "bg-red-500 w-24 text-white h-[32px] rounded-[6px] ml-4",
                "hover:bg-red-400 hover:text-white"
              )}
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </Form.Item>

      </Form>
    </>
  );

  async function updateUser({username, name, image}: FieldType) {
    const formData = new FormData();
    if (username) {
      formData.set("username", username);
    }
    if (name) {
      formData.set("name", name);
    }

    if (image?.fileList.length === 1) {
      formData.set("image", image.file.originFileObj as any);
    }

    dispatch(updateAccount(formData))
      .unwrap()
      .then(() => {
        api.success({
          message: "User info updated successfully",
          duration: 3,
        });
      });
  }

  function reset() {
    form.resetFields();
    form.setFieldsValue({username, name});
  }
}
