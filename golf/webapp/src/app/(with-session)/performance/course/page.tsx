"use client";

import { DistanceMetric } from "@/app/(with-session)/course/types";
import { Score } from "@/app/(with-session)/performance/types";
import { makeUrl } from "@/lib/api";
import axios from "axios";
import dayjs from "dayjs";
import { sort } from "radash";
import React, { useEffect, useState } from "react";

type Props = {
  metric: DistanceMetric;
}

export default function CoursePerformance({metric}: Props) {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    axios.get<Score[]>(makeUrl("/performance"))
      .then(({data}) => {
        setScores(
          sort(data.map(v => ({...v, datetime: dayjs((v.datetime))})),
            e => e.datetime.unix())
        );
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(scores);

  if (scores.length === 0) {
    return (
      <div>
        No scores posted yet!
      </div>
    );
  }

  return (
    <div>
      Course Performance
    </div>
  );
}
