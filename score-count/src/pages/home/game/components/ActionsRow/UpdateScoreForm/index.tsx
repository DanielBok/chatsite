import { Score, useScoreContext } from "@/pages/home/game/context";
import { Modal, Radio, Space } from "antd";
import { useScoreUpdateContext } from "../context";
import UpdateTable from "./UpdateTable";


const options = [
  {label: "Delta", value: "delta"},
  {label: "Overwrite", value: "overwrite"},
];


export default function UpdateScoreForm() {
  const {open, setOpen, method, setMethod, scores} = useScoreUpdateContext();
  const {gameId, sendScores} = useScoreContext();

  return (
    <Modal
      title="Update Scores"
      onCancel={() => setOpen(false)}
      onOk={sendScoreData}
      open={open}
      okText="Update"
    >
      <Space
        direction="vertical"
        size={4}
        className="my-4 w-full"
      >
        <Radio.Group
          options={options}
          onChange={(v) => setMethod(v.target.value)}
          value={method}
          optionType="button"
          buttonStyle="solid"
        />
        <UpdateTable/>
      </Space>

    </Modal>
  );

  function sendScoreData() {
    const payload = Object.values(scores)
      .reduce((acc, {score, id, name, scorePrefix}) => {
        acc.push({
          id,
          name,
          score: scorePrefix === "sub" ? -score : score,
        });
        return acc;
      }, [] as Score[]);

    sendScores({
      id: gameId,
      method,
      scores: payload
    });

    setOpen(false);
  }
}
