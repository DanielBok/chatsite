import PageLinks from "@/app/(components)/PageLinks";
import React from "react";

export default function Information() {
  return (
    <div className="hero min-h-screen bg-base-200 bg-opacity-60">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Daniel and Priscilla</h1>

          <div className="divider"/>

          <PageLinks/>
        </div>
      </div>
    </div>
  );
}
