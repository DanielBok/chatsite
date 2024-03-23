import { useAppDispatch, useRootSelector } from "@/store";
import { metaSlice } from "@/store/meta/reducer.ts";
import { Space } from "antd";
import ActionButton from "./ActionButton";


export default function JoinCreateGamePage() {
  const name = useRootSelector(s => s.meta.name)!;
  const dispatch = useAppDispatch();

  return (
    <Space
      className="flex flex-col px-2"
      size={2}
      direction="vertical"
    >
      <div className="text-4xl mb-2">Hello {name}!</div>
      <div className="text-lg mb-4">What would you like to do?</div>
      <Space className="flex flex-col md:flex-row" size={16}>

        <ActionButton className="border-blue-500 hover:bg-blue-500 text-blue-700">
          Create Room
        </ActionButton>

        <ActionButton className="border-emerald-500 hover:bg-emerald-500 text-emerald-700">
          Join Room
        </ActionButton>

        <ActionButton
          className="border-orange-500 hover:bg-orange-500 text-orange-700"
          onClick={changeName}
        >
          Change Name
        </ActionButton>
      </Space>
    </Space>
  );

  function changeName() {
    dispatch(metaSlice.actions.setName(null));
  }
}
