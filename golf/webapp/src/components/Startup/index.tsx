import { useAppDispatch } from "@/store";
import { verifyToken } from "@/store/account/thunks";
import { getJWTFromCookies } from "@/store/account/utils";
import React, { useEffect } from "react";


/**
 * Components that triggers initial dispatches. Fetch startup data
 */
export default function Startup({children}: React.PropsWithChildren) {
  const dispatch = useAppDispatch();
  const jwtToken = getJWTFromCookies();

  useEffect(() => {
    if (jwtToken) {
      dispatch(verifyToken(jwtToken));
    }

  }, [dispatch, jwtToken]);

  return <>{children}</>;
}
