"use client";

import { withProtectedRoute } from "@/context/auth-context";
import React from "react";


function Layout({children}: React.PropsWithChildren) {
  return children;
}


export default withProtectedRoute()(Layout);