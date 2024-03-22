import { Dispatch, ThunkMiddleware } from "@reduxjs/toolkit";
import { Action, UnknownAction } from "redux";
import WebSocket from "ws";
import type { RootState } from "@/store/types.ts";

type WebSocketHandler<State, BasicAction extends Action = UnknownAction> = (socket: WebSocket,
                                                                            action: BasicAction,
                                                                            state: State,
                                                                            dispatch: Dispatch<BasicAction>) => void;

export const WebSocketMiddleware: <BasicAction extends Action = UnknownAction, ExtraThunkArg = undefined> (socket: WebSocket, handler: WebSocketHandler<RootState, BasicAction>) => ThunkMiddleware<RootState, BasicAction, ExtraThunkArg> =
  (socket, handler) =>
    ({dispatch, getState}) =>
      (next) =>
        (action) => {
          handler(socket, action as any, getState(), dispatch);
          return next(action);
        };
