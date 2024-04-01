import { BACKEND_BASE_URL, makeUrl } from "@/constants";
import { useRootSelector } from "@/store";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export type Method = "overwrite" | "delta";

export type Score = {
  id: number
  name: string  // player's name, and unique identifier
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
  const name = useRootSelector(s => s.meta.name);
  const socketUrl = `ws://${BACKEND_BASE_URL}/sc/game/ws/${gameId}`;
  const [scores, setScores] = useState<Score[]>([]);
  const {sendJsonMessage, lastJsonMessage} = useWebSocket<Score[]>(socketUrl, {share: true});

  useEffect(() => {
    axios.post<Score[]>(makeUrl(`/sc/game/${gameId}/join`), {name, score: 0})
      .then(({data}) => {
        setScores(data);
      });
  }, [gameId, name]);

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