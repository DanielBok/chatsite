import { APP_NAME } from "@/constants";
import React from "react";


export default function Footer() {
  const firstMet = "2021-10-24";
  const marriageDate = "2023-06-02";

  return (
    <div className="bg-[#fee26d] text-xs p-4">
      <div className="container m-auto p-4 max-w-lg">
        <p className="mb-2 text-center">
          Monkey Chat and Beaver Chat first met
          in <Highlight>{firstMet}</Highlight> and have been married
          since <Highlight>{marriageDate}</Highlight>. Since their
          Monkey Chat's belly has gotten bigger and bigger because
          Beaver Chat loves to feed Monkey Chat with lots of good food.
        </p>
        <p className="mb text-center">
          When it comes to making food, Beaver Chat being her usual self
          is always frazzled when it comes to what to cook. Sometimes,
          she buys ingredients without thinking and other times, she just
          doesn't know what to cook. <Highlight>{APP_NAME}</Highlight> was
          thus born as a tool to help Beaver Chat figure out what to cook.
        </p>
      </div>
    </div>
  );
}


const Highlight = ({children}: React.PropsWithChildren) => (
  <span className="font-bold">{children}</span>
);
