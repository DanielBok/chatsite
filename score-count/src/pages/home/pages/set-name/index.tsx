import { useAppDispatch } from "@/store";
import { metaSlice } from "@/store/meta/reducer";
import { UserOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import { useState } from "react";

export default function SetNamePage() {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  return (
    <Space
      className="flex flex-col px-2"
      direction="vertical"
      size={2}
    >
      <div className="text-4xl mb-2">Hello Stranger!</div>
      <div className="mb-2 text-lg">Before we start, tell us who you are</div>
      <Input
        prefix={<UserOutlined/>}
        placeholder="Your game name"
        value={name}
        onChange={(e) => setName(e.target.value || "")}
        onKeyUp={(e) => e.key === "Enter" ? onSubmit() : null}
      />
      <div className="flex flex-row justify-end mt-2">
        <Button
          type="primary"
          disabled={name.trim() === ""}
          onClick={onSubmit}
        >Let's go</Button>
      </div>
    </Space>
  );

  function onSubmit() {
    dispatch(metaSlice.actions.setName(name));
  }
}

