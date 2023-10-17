import { Image } from "antd";
import React from "react";
import { useLocation } from "react-router";
import Img from "./unable-to-load.webp";

export default function Forbidden() {
  const {pathname} = useLocation();

  return (
    <div className="flex flex-col items-center">
      <Image
        src={Img}
        alt="Forbidden"
        height={450}
        width={675}
        className="my-4 h-fit"
        preview={false}
      />
      <div>
        <div className="mb-4 mt-10 text-center">
          The path <code>{pathname}</code> requires admin rights to access. If you believe this
          is unexpected, please contact <span className="text-blue-400">Monkey Chat</span>.
        </div>
      </div>
    </div>
  );
}
