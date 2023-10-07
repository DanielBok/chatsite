import { APP_NAME } from "@/constants";
import React from "react";

const Footer = () => {
  const firstMet = "2021-10-24";
  const marriageDate = "2023-06-02";

  return (
    <div className="bg-teal-600 text-white text-xs">
      <div className="container m-auto p-4">
        <p className="mb-1 text-center">
          Monkey Chat and Beaver Chat first met
          in <Highlight>{firstMet}</Highlight> and
          have been married since <Highlight>{marriageDate}</Highlight>.
        </p>
        <p className="mb-1 text-center">
          <Highlight>{APP_NAME}</Highlight> is a testament of their mutual love
          and their passion for golf.
        </p>
      </div>
    </div>
  );
};

const Highlight = ({children}: React.PropsWithChildren) => (
  <span className="font-bold">{children}</span>
);

export default Footer;