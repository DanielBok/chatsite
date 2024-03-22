import JoinCreateGamePage from "@/pages/home/pages/join-create-game";
import SetNamePage from "@/pages/home/pages/set-name";
import { useRootSelector } from "@/store";


export default function Home() {
  const hasNotSetName = useRootSelector((state) => state.meta.name === null);

  return (
    <div className="bg-white h-screen w-screen flex justify-center items-center container">
      <div>
        {hasNotSetName ? <SetNamePage/> : <JoinCreateGamePage/>}
      </div>
    </div>
  );
}
