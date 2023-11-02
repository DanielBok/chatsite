"use client";

import { useContentManagerContext } from "@/app/[event]/(components)/ContentManager/context";
import { ContentInfo, ContentManagerContextType } from "@/app/[event]/(components)/ContentManager/types";
import React from "react";
import BaseAlbum from "./BaseAlbum";
import ViewAlbum from "./ViewAlbum";


type Props = {
  contents: ContentInfo[]
}

export default function Album({contents}: Props) {
  const {mode} = useContentManagerContext();

  return (
    <BaseAlbum contents={contents}>
      <SelectAlbum mode={mode}/>
    </BaseAlbum>
  );
}

const SelectAlbum = ({mode}: Pick<ContentManagerContextType, "mode">) => {
  switch (mode) {
    case "View":
      return <ViewAlbum/>;
    default:
      return null;
  }
};