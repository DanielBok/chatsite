"use client";

import classNames from "classnames";
import React from "react";
import ScrollToTop from "react-scroll-to-top";


export default function ScrollTopButton() {
  return (
    <ScrollToTop
      smooth
      className={classNames("flex justify-center items-center !bg-teal-500",
        "hover:w-[46px] hover:h-[46px] hover:right-[37px] bottom-[37px]")}
      color="white"
    />
  );
}
