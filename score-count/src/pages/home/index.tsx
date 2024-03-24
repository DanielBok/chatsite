import JoinCreateGamePage from "@/pages/home/pages/join-create-game";
import SetNamePage from "@/pages/home/pages/set-name";
import { useRootSelector } from "@/store";


export default function Home() {
  const name = useRootSelector((state) => state.meta.name);

  return (
    <div className="bg-white h-screen w-screen flex justify-center items-center container">
      <div>
        {name ? <JoinCreateGamePage username={name}/> : <SetNamePage/> }
      </div>
    </div>
  );
}
