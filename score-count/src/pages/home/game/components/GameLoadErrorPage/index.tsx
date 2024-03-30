import { useRootSelector } from "@/store";
import { Link, Navigate } from "react-router-dom";
import ErrorCat from "./error.png";

type Props = {
  gameId: number
}

export default function GameLoadErrorPage({gameId}: Props) {
  const error = useRootSelector((s) => s.game.error);
  if (error === null) {
    // no error, we should never be here
    return <Navigate to={`/game/${gameId}`}/>;
  }

  return (
    <div className="flex flex-col container items-center justify-center h-screen">
      <div className="max-w-[300px] text-center">
        <img
          src={ErrorCat}
          alt="Error cat image"
          width={250}
        />

        <p className="font-4xl font-semibold">Encountered an error loading game.</p>
        <p className="font-light">{error}</p>
        <Link to="/"> Go back home</Link>
      </div>
    </div>
  );
}
