import type { CollapseProps } from "antd";
import { Collapse, Divider } from "antd";
import React from "react";
import InfoFields from "./InfoFields";
import SecurityFields from "./SecurityFields";


function ManageAccount() {
  const items: CollapseProps["items"] = [
    {
      key: "username",
      label: <b>Change User Information</b>,
      children: <InfoFields/>,
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

export default ManageAccount;