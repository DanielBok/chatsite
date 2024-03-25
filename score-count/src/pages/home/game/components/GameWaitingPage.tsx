import { Spin } from "antd";


export default function GameWaitingPage() {
  return (
    <div className="flex flex-col container items-center justify-center h-screen">
      <Spin className="my-4 text-xl" size="large"/>
      <div className="font-light max-w-[300px]">
        Please wait as we load the game details
      </div>
    </div>
  );
}
