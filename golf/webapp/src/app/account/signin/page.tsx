"use client";

import { useAuth } from "@/context/auth-context";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import { redirect } from "next/navigation";
import React from "react";

type FieldType = {
  username: string;
  password: string
}


export default function SignIn() {
  const {user, signIn} = useAuth();
  if (user) {
    redirect("/");
  }

  return (
    <div className="my-6 flex flex-col">
      <Row>
        <Col offset={3}>
          <div className="text-xl font-bold">
            Sign in
          </div>
        </Col>
      </Row>
      <Divider/>
      <Form
        labelCol={{span: 3}}
        wrapperCol={{span: 12}}
        onFinish={login}
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

        <Form.Item wrapperCol={{offset: 3}}>
          <Button
            htmlType="submit"
            type="primary"
            className="bg-teal-600"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  async function login({username, password}: FieldType) {
    await signIn(username, password);
  }
};
