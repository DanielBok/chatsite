import { useAppDispatch } from "@/store";
import { createGame } from "@/store/game/thunks";
import { CreateRoomResponse } from "@/store/game/types";
import { Input, InputNumber, Modal, Slider, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";


export default function CreateGameModal() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [roomName, setRoomName] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(4);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <ActionButton
        className="border-blue-500 hover:bg-blue-500 text-blue-700"
        onClick={() => setOpen(true)}
      >
        Create Room
      </ActionButton>

      <Modal
        title={<div className="text-lg font-bold">Create Game</div>}
        centered
        open={open}
        onOk={() => {
          (dispatch(createGame({name: roomName, maxPlayers})))
            .then(({type, payload}) => {
              if (type.endsWith("fulfilled")) {
                const {id} = payload as CreateRoomResponse;
                navigate(`/game/${id}`);
                setError("");
                setOpen(false);
              } else if (type.endsWith("rejected")) {
                setError(payload as string);
              }
            });
        }}
        okText="Create"
        onCancel={() => setOpen(false)}
        width="100%"
        className="max-w-[640px]"
      >
        <Space direction="vertical" size={4} className="w-full mb-8">
          <div>
            <div className="text-base font-semibold my-2">Game name</div>
            <Input
              placeholder="Name"
              value={roomName}
              maxLength={100}
              onChange={(e) => setRoomName(e.target.value)}
              className="w-full"
            />
            {error && (
              <div className="text-red-600">{error}</div>
            )}
          </div>

          <div>
            <div className="text-base font-semibold my-2">Max Players</div>
            <div className="flex flex-row">
              <Slider
                min={1}
                max={20}
                onChange={(v) => setMaxPlayers(v)}
                value={maxPlayers}
                className="grow"
              />
              <InputNumber
                min={1}
                max={100}
                className="ml-4 max-w-[60px] flex-none"
                onChange={(v) => {
                  if (typeof v === "number") {
                    setMaxPlayers(v);
                  }
                }}
                value={maxPlayers}
              />
            </div>
          </div>
        </Space>
      </Modal>
    </>
  );
}
