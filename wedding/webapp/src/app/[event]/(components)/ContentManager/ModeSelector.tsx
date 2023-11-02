"use client";

import classNames from "classnames";
import React from "react";
import { VscAdd } from "react-icons/vsc";
import { useContentManagerContext } from "./context";
import { ContentManagerContextType } from "./types";

const MODES: ContentManagerContextType["mode"][] = ["View", "Download", "Edit"];

export default function ModeSelector() {
  const {mode, setMode} = useContentManagerContext();

  return (
    <div className="fixed bottom-3 right-3">
      <div className="dropdown dropdown-top dropdown-end dropdown-hover">
        <label tabIndex={0} className="btn m-1">
          <VscAdd/>
        </label>
        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
          {MODES.map(m => (
            <li
              key={m}
              onClick={() => setMode(m)}
              className={classNames(mode === m && "bg-green-300")}
            >
                <span>
                  <span className="font-bold">{m}</span> Mode
                </span>
            </li>
          ))}
          <li onClick={scrollToTop}>
            <span className="font-bold">Scroll To Top</span>
          </li>
        </ul>
      </div>
    </div>
  );

  function scrollToTop() {
    window.scrollTo(0, 0);
  }
}
