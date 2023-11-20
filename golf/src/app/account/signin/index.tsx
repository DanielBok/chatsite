import { getRedirectBackPath, removeRedirectBackPath } from "@/components/MainLayout/Protected/lib";
import { useAppDispatch } from "@/store";
import { useAccount } from "@/store/account/hooks";
import { userLogIn } from "@/store/account/thunks";
import { Button, Divider, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

type FieldType = {
  username: string;
  password: string;
}


export default function SignIn() {
  const dispatch = useAppDispatch();
  const {user, loading} = useAccount();
  const [redirectTo] = useState(getRedirectBackPath());

  useEffect(() => {
    return () => {
      removeRedirectBackPath();
    };
  }, []);

  if (loading) {
    return null;
  }

  if (user) {
    return <Navigate to={redirectTo} replace/>;
  }

  return (
    <div className="flex justify-center">
      <div className="my-6 flex flex-col pl-4 min-w-[50%] w-[50vw] items-center">
        <div className="text-xl font-bold">
          Sign in
        </div>
        <Divider/>
        <Form
          onFinish={login}
          layout="vertical"
          className="w-full"
        >
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[{required: true, message: "Please enter your username"}]}
          >
            <Input autoComplete="username"/>
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[{required: true, message: "Please enter your password"}]}
          >
            <Input.Password autoComplete="current-password"/>
          </Form.Item>

          <Form.Item name="submit-login-details">
            <Button
              htmlType="submit"
              type="primary"
              className="bg-teal-600 w-24"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );

  async function login(auth: FieldType) {
    await dispatch(userLogIn(auth));
  }
};
