import { useAppDispatch } from "@/store";
import { JWT_COOKIE, verifyToken } from "@/store/account/thunks";
import Cookies from "js-cookie";
import React, { useEffect } from "react";


/**
 * Components that triggers initial dispatches. Fetch startup data
 */
export default function Startup({children}: React.PropsWithChildren) {
  const dispatch = useAppDispatch();
  const jwtToken = Cookies.get(JWT_COOKIE);

  useEffect(() => {
    if (jwtToken) {
      dispatch(verifyToken(jwtToken));
    }

  }, [dispatch, jwtToken]);

  return <>{children}</>;
}
