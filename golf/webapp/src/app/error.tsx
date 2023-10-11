"use client";

import { Collapse } from "antd";
import Image from "next/image";
import React from "react";
import Img2 from "../static/errors/need-support.png";
import Img1 from "../static/errors/something-went-wrong.png";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

const IMAGES = [Img1, Img2];

export default function Error({error}: ErrorProps) {
  const img = IMAGES[Math.floor(Math.random() * IMAGES.length)];
  return (
    <div className="flex flex-col items-center">
      <Image
        src={img}
        alt="Error Image"
        height={450}
        width={675}
        className="my-4"
      />
      <div>
        <div className="mb-4">
          An error was encountered. Please contact <span className="text-blue-400">Monkey Chat</span> if
          this was unexpected.
        </div>
        <Collapse
          defaultActiveKey={["name", "message", "stack"]}
          className="w-full"
          items={[
            {
              key: "name",
              label: <b>Error Name</b>,
              children: (
                <Details>{error.name}</Details>
              )
            },
            {
              key: "message",
              label: <b>Error Message</b>,
              children: (
                <Details>{error.message}</Details>
              )
            },
            {
              key: "stack",
              label: <b>Error Stack</b>,
              children: (
                <Details>{error.stack}</Details>
              )
            }
          ]}
        />
      </div>
    </div>
  );

  function Details({children}: React.PropsWithChildren) {
    return (
      <div className="bg-gray-100 p-2 rounded-md">
        <code>
          {children}
        </code>
      </div>
    );
  }
}