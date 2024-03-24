import { useAppDispatch } from "@/store";
import { metaSlice } from "@/store/meta/reducer.ts";
import { Space } from "antd";
import ActionButton from "./ActionButton";
import CreateGameModal from "./CreateGameModal";


type Props = {
  username: string
}

export default function JoinCreateGamePage({username}: Props) {
  const dispatch = useAppDispatch();

  return (
    <Space
      className="flex flex-col px-2"
      size={2}
      direction="vertical"
    >
      <div className="text-4xl mb-2">Hello {username}!</div>
      <div className="text-lg mb-4">What would you like to do?</div>
      <Space className="flex flex-col md:flex-row" size={16}>

        <CreateGameModal/>

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
