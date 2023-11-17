import { APP_NAME } from "@/constants";
import React from "react";
import { Image } from "antd";
import CatImage from "./cat-eating.jpg";


export default function TopBanner() {
  return (
    <div className="pt-1 flex justify-center pb-12 min-h-screen"
         style={{
           background: "linear-gradient(180deg, #fff256 75%, rgba(255, 228, 0, 1) 85%, rgba(255, 193, 0, 1) 100%)"
         }}
    >
      <div className="container flex flex-col justify-center items-center">
        <Image src={CatImage} className="h-[400px]" preview={false}/>
        <h1 className="text-4xl leading-tight my-4 font-bold text-center">
          Feed your hungry chats!
        </h1>
        <p className="text-lg mb-8 text-center">
          Need to feed your chats but having trouble deciding what they should eat?
          Fear not, <b>{APP_NAME}</b> is here to help you
        </p>
        <div className="flex justify-center mx-auto">
          <button
            className="hover:underline bg-sky-500 text-white font-bold rounded-full py-2 md:py-4 px-4">
            View Cookbook
          </button>
          <button
            className="ml-2 md:ml-4 hover:underline bg-white text-gray-800 font-bold rounded-full py-2 md:py-4 px-4">
            Random Recipe
          </button>
        </div>
      </div>
    </div>
  );
}
