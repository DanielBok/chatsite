import { EventType } from "@/lib/pages";
import React from "react";
import ContentManagerContextProvider from "./context";
import Tracker from "./Tracker";

type Props = React.PropsWithChildren<{
  event: EventType
  className?: string
}>

export default function ContentManager({event, className, children}: Props) {
  return (
    <div className={className}>
      <ContentManagerContextProvider event={event}>
        <Tracker>
          {children}
        </Tracker>
      </ContentManagerContextProvider>
    </div>
  );
}
