import Header from "@/app/[event]/(components)/Header";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Cat404Image from "./(components)/cat-404.jpg";

export default function NotFound() {
  return (
    <main className="bg-white flex flex-col h-screen">
      <Header/>

      <div className="hidden md:flex flex-grow-0 h-full">
        <div className="flex-grow-0 w-full h-full p-4 flex flex-col items-center text-center justify-center">
          <p className="text-2xl font-bold mb-6">
            Oops!
          </p>
          <p>
            The page you are looking for {"doesn't"} exist. Please use the links to navigate
            to where you wanna go or head back to the {" "}
            <Link href="/" className="link link-info">
              main landing page
            </Link>.
          </p>
        </div>
        <div className="divider divider-vertical mx-2 w-[1px] h-[80%] bg-gray-400 m-auto"/>
        <div className="flex items-end">
          <Image
            src={Cat404Image}
            alt="404 Image"
            className="aspect-auto max-h-[80%]"/>
        </div>
      </div>

      <div className="md:hidden p-2">
        <div className="flex flex-col text-center">
          <Image
            src={Cat404Image}
            alt="404 Image"
            className="aspect-auto max-h-[80%]"/>

          <div className="divider divider-horizontal w-full h-[1px] bg-gray-400 my-2 m-auto"/>

          <div>
            <p className="text-2xl font-bold mt-4 mb-6">
              Oops!
            </p>
            <p>
              The page you are looking for {"doesn't"} exist. Please use the links to navigate
              to where you wanna go or head back to the {" "}
              <Link href="/" className="link link-info">
                main landing page
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
