import { Score } from "@/pages/home/game/context";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { InputNumber, Radio } from "antd";
import { useEffect, useState } from "react";
import { ScorePrefix, useScoreUpdateContext } from "../context";

export default function UpdateTable() {
  const {scores} = useScoreUpdateContext();

  return (
    <div className="w-full">
      {Object.values(scores)
        .sort((s1, s2) => {
          if (s1.id < s2.id) return -1;
          else if (s1.id > s2.id) return 1;
          else return 0;
        })
        .map(({score, name, id}) =>
          <ScoresRow
            key={id}
            score={score}
            name={name}
            id={id}
          />
        )
      }
    </div>
  );
}

const deltaOptions = [
  {label: <PlusOutlined/>, value: "add"},
  {label: <MinusOutlined/>, value: "sub"},
];

function ScoresRow(score: Score) {
  const {method, updateScore} = useScoreUpdateContext();
  const [scorePrefix, setScorePrefix] = useState<ScorePrefix>("add");
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    switch (method) {
      case "overwrite":
        setScorePrefix(score.score < 0 ? "sub" : "add");
        setDelta(Math.abs(score.score));
        break;
      case "delta":
        setScorePrefix("add");
        setDelta(0);
        break;

    }
  }, [method]);

  return (
    <div className="flex flex-row my-2 px-2 w-full">
      <div className="font-semibold grow text-lg">{score.name}</div>
      <div className="flex-none">
        <Radio.Group
          options={deltaOptions}
          onChange={(e) => {
            const scorePrefix = e.target.value;
            updateScore({...score, scorePrefix});
            setScorePrefix(scorePrefix);
          }}
          value={scorePrefix}
          optionType="button"
          buttonStyle="solid"
        />
      </div>

      <div className="flex-none">
        <InputNumber
          min={0}
          className="ml-4 max-w-[80px] flex-none"
          onChange={(v) => {
            if (typeof v === "number") {
              setDelta(v);
              updateScore({...score, score: v, scorePrefix});
            }
          }}
          value={delta}
        />
      </div>
    </div>
  );
}