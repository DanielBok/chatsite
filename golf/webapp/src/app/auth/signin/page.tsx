"use client";

import { CredentialName } from "@/app/api/auth/[...nextauth]/route";
import { Button, Divider, Form, Input, Col, Row } from "antd";
import { signIn } from "next-auth/react";
import React from "react";

type FieldType = {
  username: string;
  password: string
}


const SignIn = () => {
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
        labelCol={{md: 4, lg: 3}}
        wrapperCol={{span: 12}}
        onFinish={login}
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{required: true, message: "Please enter your username"}]}
        >
          <Input/>
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{required: true, message: "Please enter your password"}]}
        >
          <Input.Password/>
        </Form.Item>

        <Form.Item wrapperCol={{offset: 3, span: 12}}>
          <Button
            htmlType="submit"
            type="primary"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );

  async function login({username, password}: FieldType) {
    const result = await signIn("credentials",
      {username, password, redirect: true, callbackUrl: "/"},
    );
    console.log(result);
  }
};

export default SignIn;