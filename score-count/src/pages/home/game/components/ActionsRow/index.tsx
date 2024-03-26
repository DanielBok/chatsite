import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { ScoreUpdateContextProvider, useScoreUpdateContext } from "./context";
import UpdateScoreForm from "./UpdateScoreForm";

export default function ActionsRow() {
  return (
    <ScoreUpdateContextProvider>
      <Space
        direction="horizontal"
        size={10}
        className="flex flex-row mt-8 mb-4 justify-between"
      >
        <OpenModalButton/>
        <ExitGameButton/>
      </Space>
      <UpdateScoreForm/>
    </ScoreUpdateContextProvider>
  );
}

const OpenModalButton = () => {
  const {setOpen} = useScoreUpdateContext();

  return (
    <Button
      type="primary"
      className="min-w-[80px]"
      onClick={() => setOpen(true)}
    >
      Update
    </Button>
  );
};

const ExitGameButton = () => {
  const navigate = useNavigate();

  return (
    <Popconfirm
      title="Leave game"
      description="Are you sure you want to leave the game?"
      okText="Yes"
      cancelText="No"
      icon={<QuestionCircleOutlined style={{color: "red"}}/>}
      onConfirm={() => navigate("/")}
    >
      <Button
        type="primary"
        className="min-w-[80px]"
        danger
      >
        Exit
      </Button>
    </Popconfirm>
  );
};
