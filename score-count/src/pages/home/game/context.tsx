import { BACKEND_BASE_URL } from "@/constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export type Method = "overwrite" | "delta";

export type Score = {
  id: number
  uuid: string  // player's UUID
  name: string  // player's name
  score: number
}

type ScoresGameTask = {
  id: number
  method: string
  scores: Score[]
}

type ScoreContext = {
  gameId: number,
  scores: Score[]
  sendScores: (message: ScoresGameTask, keep?: boolean) => void
}

const ScoreContext = createContext<ScoreContext>({} as ScoreContext);


export const ScoreContextProvider = ({gameId, children}: React.PropsWithChildren<Pick<ScoreContext, "gameId">>) => {
  const socketUrl = `ws://${BACKEND_BASE_URL}/sc/game/ws/${gameId}`;
  const [scores, setScores] = useState<Score[]>([]);
  const {sendJsonMessage, lastJsonMessage} = useWebSocket<Score[]>(socketUrl, {share: true});

  useEffect(() => {
    if (Array.isArray(lastJsonMessage)) {
      setScores(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  return (
    <ScoreContext.Provider value={{gameId, scores, sendScores: sendJsonMessage}}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreContext);