import { Score, useScoreContext } from "@/pages/home/game/context";
import type { TableColumnsType } from "antd";
import { Table } from "antd";

export default function ScoreTable() {
  const columns: TableColumnsType<Score> = [
    {
      title: "Player",
      dataIndex: "name",
      className: "min-w-[120px]"
    },
    {
      title: <div className="text-right">Score</div>,
      dataIndex: "score",
      render: value => <div className="min-w-[50px] text-right">{value}</div>
    }
  ];

  const {scores} = useScoreContext();


  return (
    <div className="my-4">
      <Table
        columns={columns}
        dataSource={scores}
        size="small"
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}
