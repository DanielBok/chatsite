import { usePerfOptions } from "@/app/(with-session)/context";
import { Tee } from "@/app/(with-session)/course/types";
import { Score } from "@/app/(with-session)/performance/types";
import { getConversionMap, TEE_COLOR_CLASS } from "@/constants";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import classNames from "classnames";
import React from "react";
import { sum } from "radash";

type Props = {
  scores: Score[];
}

export default function SummaryScoreTable({scores}: Props) {
  const {metric} = usePerfOptions();

  const data = scores.map(({
                             id,
                             tee,
                             game,
                             datetime,
                             metric: currMetric,
                             scores
                           }) => {
    const factor = getConversionMap(currMetric)[metric];
    const distance = Math.round(sum(scores, e => e.distance) * factor);
    const totalScore = sum(scores, e => e.score);
    const totalPar = sum(scores, e => e.par);

    return ({
      id,
      datetime: datetime.format("YYYY-MM-DD"),
      tee,
      game,
      score: `${totalScore} / ${totalPar}`,
      distance,
    });
  });

  const columns: ColumnsType<typeof data[number]> = [
    {
      title: "Date",
      dataIndex: "datetime",
      width: 100,
    },
    {
      title: "Tee",
      dataIndex: "tee",
      width: 80,
      render: (value: Tee) => (
        <span className={classNames(TEE_COLOR_CLASS[value], "p-1 rounded")}>
          {value}
        </span>
      ),
    },
    {
      title: "Game Type",
      dataIndex: "game",
      width: 100,
    },
    {
      title: `Distance (${metric})`,
      dataIndex: "distance",
      width: 150,
    },
    {
      title: "Score / Par",
      dataIndex: "score",
    },

  ];

  return (
    <Table
      dataSource={data}
      columns={columns}
      size="small"
      rowKey="id"
      title={() => <div className="font-bold">Summary</div>}
      bordered
      pagination={false}
    />
  );
}
