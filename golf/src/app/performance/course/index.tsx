import SummaryScoreTable from "@/app/performance/course/(component)/SummaryScoreTable";
import { Score } from "@/app/performance/types";
import axios from "axios";
import dayjs from "dayjs";
import { sort } from "radash";
import React, { useEffect, useState } from "react";


export default function CoursePerformance() {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    axios.get<Score[]>("performance")
      .then(({data}) => {
        setScores(
          sort(data.map(v => ({...v, datetime: dayjs((v.datetime))})),
            e => e.datetime.unix())
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (scores.length === 0) {
    return (
      <div>
        No scores posted yet!
      </div>
    );
  }

  return (
    <div>
      <SummaryScoreTable scores={scores}/>
    </div>
  );
}
