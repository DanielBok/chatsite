import Background from "@/app/(components)/Background";
import Information from "@/app/(components)/Information";
import React from "react";

export default function Home() {
  return (
    <main>
      <Background/>
      <div className="w-screen h-screen absolute top-0 left-0 z-10">
        <Information/>
      </div>
    </main>
  );
}
