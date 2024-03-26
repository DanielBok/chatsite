import { Method, Score, useScoreContext } from "@/pages/home/game/context";

import React, { createContext, useContext, useEffect, useState } from "react";

export type ScorePrefix = "add" | "sub";

type ScoreRecordItem = Score & { scorePrefix: ScorePrefix };

type ScoreUpdateContextProps = {
  method: Method
  setMethod: (method: Method) => void
  scores: Record<number, ScoreRecordItem>
  updateScore: (score: ScoreRecordItem) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const ScoreUpdateContext = createContext<ScoreUpdateContextProps>({} as ScoreUpdateContextProps);


export const ScoreUpdateContextProvider = ({children}: React.PropsWithChildren) => {
  const [method, setMethod] = useState<Method>("delta");
  const [open, setOpen] = useState(false);
  const {scores, setScores} = useScoresCopy();

  return (
    <ScoreUpdateContext.Provider value={{method, setMethod, scores, updateScore, open, setOpen}}>
      {children}
    </ScoreUpdateContext.Provider>
  );

  function updateScore(score: ScoreRecordItem) {
    setScores(prev => ({...prev, [score.id]: score}));
  }
};

const useScoresCopy = () => {
  const {scores: baseScores} = useScoreContext();
  const [scores, setScores] = useState(keyById(baseScores));

  useEffect(() => {
    setScores(keyById(baseScores));
  }, [baseScores]);

  return {scores, setScores};

  function keyById(scoresArray: Score[]): Record<number, ScoreRecordItem> {
    return scoresArray
      .reduce((acc, s) =>
        ({
          ...acc,
          [s.id]: {
            ...s,
            scorePrefix: "add"
          }
        }), {} as Record<number, ScoreRecordItem>);
  }

};

export const useScoreUpdateContext = () => useContext(ScoreUpdateContext);