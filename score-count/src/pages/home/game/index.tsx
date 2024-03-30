import { useAppDispatch, useRootSelector } from "@/store";
import { checkGameDetails } from "@/store/game/thunks";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import ScoreUpdater from "./components/ActionsRow";
import GameLoadErrorPage from "./components/GameLoadErrorPage";
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
  const [room, loadingState] = useRootSelector(({game}) => [game.room, game.loading.room]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!id && room === null) {
      dispatch(checkGameDetails(id));
    }
  }, [id, room]);

  if (!id) {
    return <Navigate to="/"/>;
  } else if (loadingState === "error") {
    return <GameLoadErrorPage gameId={id}/>;
  } else if (loadingState === "pending" || !room) {
    return <GameWaitingPage/>;
  }

  return (
    <ScoreContextProvider gameId={id}>
      <div className="flex flex-col items-center w-full">
        <div className="container flex flex-col items-center shadow-2xl min-h-[96vh]">
          <div className="px-8 pt-4 pb-2 rounded">
            <div className="text-lg text-center">
              Playing Game: <span className="font-bold">{room!.name}</span>
            </div>

            <ScoreTable/>

            <ScoreUpdater/>
          </div>
        </div>
      </div>
    </ScoreContextProvider>
  );
}
