import { BACKEND_BASE_URL } from "@/constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

export type Score = {
  id: number
  uuid: string  // player's UUID
  player: string  // player's name
  score: number
}

type ScoreContext = {
  gameId: number,
  scores: Score[]
  sendScores: ReturnType<typeof useWebSocket<Score[]>>["sendJsonMessage"]
}

const ScoreContext = createContext<ScoreContext>({} as ScoreContext);


export const ScoreContextProvider = ({gameId, children}: React.PropsWithChildren<Pick<ScoreContext, "gameId">>) => {
  const socketUrl = `ws://${BACKEND_BASE_URL}/sc/game/ws-mock/${gameId}`;
  const [scores, setScores] = useState<Score[]>([]);
  const {sendJsonMessage, lastJsonMessage} = useWebSocket<Score[]>(socketUrl, {share: true});


  useEffect(() => {
    setScores(lastJsonMessage);
  }, [lastJsonMessage]);

  return (
    <ScoreContext.Provider value={{gameId, scores, sendScores: sendJsonMessage}}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreContext);