import React from "react";
import { Image } from "antd";

type Props = {
  image: string
  name: string
  title: string
}

export default function Member({image, name, title, children}: React.PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col items-center py-3 m-4 md:m-6 md:w-1/2">
      <div className="mb-4">
        <Image src={image} height={150} width={150} preview={false}/>
      </div>
      <p className="font-bold text-lg">
        {name}
      </p>
      <p className="font-bold text-base text-gray-500">
        {title}
      </p>
      <div className="my-4">
        {children}
      </div>
    </div>
  );
}
