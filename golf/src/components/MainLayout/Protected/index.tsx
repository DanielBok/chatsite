import { useUser } from "@/store/account/hooks";
import React from "react";
import { useLocation } from "react-router";
import { Navigate, Outlet } from "react-router-dom";
import Forbidden from "./Forbidden";
import { setRedirectBackPath } from "./lib";


export type ProtectedProps = {
  adminOnly?: boolean
}


export default function Protected(
  {
    adminOnly = false,
    children,
  }: React.PropsWithChildren<ProtectedProps>) {
  const user = useUser();
  const {pathname} = useLocation();

  if (!user) {
    children = <Navigate to="/account/signin" replace/>;
    setRedirectBackPath(pathname);
  } else if (adminOnly && !user!.isAdmin) {
    children = <Forbidden/>;
  }

  return (
    <>
      {children || <Outlet/>}
    </>
  );
}
