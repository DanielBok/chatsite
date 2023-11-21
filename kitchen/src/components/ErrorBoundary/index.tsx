import MainLayout from "@/components/MainLayout";
import { Collapse, Image } from "antd";
import React from "react";
import { useRouteError } from "react-router-dom";
import Img404 from "./static/404.webp";
import Img500 from "./static/500.png";

type RouteError = {
  data: string
  error: {
    message: string
    stack: string
  }
  internal: boolean
  status: number
  statusText: string
}

export default function ErrorBoundary() {
  const error = useRouteError() as RouteError;

  return (
    <MainLayout>
      <div className="flex flex-col items-center">
        <Image
          src={getImage(error.status)}
          alt="Error Image"
          height={450}
          width={675}
          className="my-4 h-fit"
          preview={false}
        />
        <div>
          <div className="mb-4 mt-10 text-center">
            An error was encountered. Please contact <span className="text-blue-400">Monkey Chat</span> if
            this was unexpected.
          </div>
          <Collapse
            defaultActiveKey={["name", "message", "stack"]}
            className="w-full"
            items={[
              {
                key: "name",
                label: <b>Error Message</b>,
                children: (
                  <Details>{error.error.message}</Details>
                )
              },
              {
                key: "stack",
                label: <b>Error Stack</b>,
                children: (
                  <Details>
                    {error.error.stack.split("\n").map(e => <div>{e}</div>)}
                  </Details>
                )
              }
            ]}
          />
        </div>
      </div>
    </MainLayout>
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

  function getImage(errorStatus: number) {
    const images = getImages();
    return images[Math.floor(Math.random() * images.length)];

    function getImages() {
      switch (errorStatus) {
        case 404:
          return [Img404];
        default:
          return [Img500];
      }
    }
  }
}