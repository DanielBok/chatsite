"use client";

import { useAuth, User, withUserSession } from "@/context/auth-context";
import type { CollapseProps } from "antd";
import { Collapse, Divider } from "antd";
import { redirect } from "next/navigation";
import React from "react";
import InfoFields from "./InfoFields";
import SecurityFields from "./SecurityFields";

type Props = {
  user: User;
}

function ManageAccount({user}: Props) {
  if (!user) {
    redirect("/account/signin");
  }

  const items: CollapseProps["items"] = [
    {
      key: "username",
      label: <b>Change User Information</b>,
      children: <InfoFields user={user}/>,
    },
    {
      key: "security",
      label: <b>Change Password</b>,
      children: <SecurityFields/>,
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="my-6 flex flex-col pl-4 min-w-[50%] w-[50vw] items-center">
        <div className="text-xl font-bold">
          Manage Account
        </div>
        <Divider/>
        <Collapse
          defaultActiveKey={items.map(e => e.key as string)}
          items={items}
          className="w-full"
        />
      </div>
    </div>
  );
}

export default withUserSession()(ManageAccount);