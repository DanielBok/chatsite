"use client";

import { useAuth } from "@/context/auth-context";
import { Button, Divider, Form, Input } from "antd";
import { redirect } from "next/navigation";
import React from "react";

type FieldType = {
  username: string;
  password: string;
}


export default function SignIn() {
  const {user, signIn} = useAuth();

  if (user) {
    redirect("/");
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

          <Form.Item>
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

  async function login({username, password}: FieldType) {
    await signIn(username, password);
  }
};
