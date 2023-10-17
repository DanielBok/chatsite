import { useAppDispatch } from "@/store";
import { updateAccount } from "@/store/account/thunks";
import { Button, Form, Input, notification } from "antd";
import classNames from "classnames";
import React from "react";

type FieldType = {
  password: string;
  confirm: string;
}

export default function SecurityFields() {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useAppDispatch();

  return (
    <>
      {contextHolder}
      <Form
        onFinish={updatePassword}
        layout="vertical"
        className="w-full"
        form={form}
      >
        <Form.Item<FieldType>
          label="New password"
          name="password"
          rules={[{required: true, message: "Please enter your new password"}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Confirm new password"
          name="confirm"
          rules={[
            {required: true, message: "Please confirm your new password"},
            ({getFieldValue}) => ({
              validator: (_, value) => {
                if (!value || getFieldValue("password") === value) return Promise.resolve();
                return Promise.reject("The new passwords do not match");
              }
            })
          ]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item>
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

  async function updatePassword({password}: FieldType) {
    const formData = new FormData();
    formData.set("password", password);

    dispatch(updateAccount(formData))
      .unwrap()
      .then(() => {
        api.success({
          message: "Password updated successfully",
          duration: 3,
        });
      });
  }

  function reset() {
    form.resetFields();
  }
}
