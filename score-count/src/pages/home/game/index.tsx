import { useAppDispatch, useRootSelector } from "@/store";
import { checkGameDetails } from "@/store/game/thunks";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import GameWaitingPage from "./components/GameWaitingPage";
import ScoreTable from "./components/ScoreTable";
import { ScoreContextProvider } from "./context";


const useGameId = (): number | null => {
  const {gameId} = useParams();
  if (!gameId) return null;
  else {
    const id = parseInt(gameId);
    return isNaN(id) ? null : id;
  }
};

export default function GamePage() {
  const id = useGameId();
  const room = useRootSelector(s => s.game.room);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!id && room === null) {
      dispatch(checkGameDetails(id));
    }
  }, [id, room]);

  if (!id) {
    return <Navigate to="/"/>;
  } else if (!room) {
    return <GameWaitingPage/>;
  }

  return (
    <ScoreContextProvider gameId={id}>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div className="container flex flex-col items-center justify-center">
          <div className="text-lg">
            Playing Game: <span className="font-bold">{room!.name}</span>
          </div>
          <ScoreTable/>
        </div>
      </div>
    </ScoreContextProvider>
  );
}
