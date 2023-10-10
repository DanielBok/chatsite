"use client";

import { makeUrl } from "@/lib/api";
import type { AxiosError } from "axios";
import axios from "axios";
import { deleteCookie, getCookie, hasCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { redirect, RedirectType } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const COOKIE_JWT = "jwt";

export type TokenResponse = {
  token: string;
}

export type User = {
  id: number
  username: string
  name: string
  isAdmin: boolean
  imagePath: string
};

export type JWTTokenInfo = User & {
  nbt: number
  exp: number
}

export type AuthenticationType = {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateAccount: (data: FormData) => Promise<void>;
}

const AuthenticationContext = createContext<AuthenticationType>({
  user: null,
  loading: true,
  error: null,
  signIn: async () => {
  },
  signOut: async () => {
  },
  updateAccount: async () => {
  }
});

export function AuthenticationProvider({children}: React.PropsWithChildren) {
  const [authState, setAuthState] = useState<Pick<AuthenticationType, "user" | "loading" | "error">>({
    user: null,
    loading: true,
    error: null,
  });

  // this effect only takes care of signing in
  useEffect(() => {
    if (hasCookie(COOKIE_JWT)) {
      tokenSignIn(getCookie(COOKIE_JWT) as string);
    } else {
      setAuthState(v => ({...v, loading: false}));
    }
  }, []);

  const value: AuthenticationType = {
    ...authState,
    signIn,
    signOut,
    updateAccount,
  };

  return <AuthenticationContext.Provider value={value}>
    {children}
  </AuthenticationContext.Provider>;

  async function signIn(username: string, password: string) {
    setAuthState(v => ({...v, loading: true}));

    try {
      const {data: {token}} = await axios.get<TokenResponse>(makeUrl("account/login"), {auth: {username, password}});

      // maxAge > 0 only when tokenSignIn is successful
      const maxAge = tokenSignIn(token);
      if (maxAge > 0) {
        setCookie(COOKIE_JWT, token, {maxAge, sameSite: true});
      }
    } catch (e) {
      setAuthState({
        user: null,
        error: (e as AxiosError<{ detail: string }>).response!.data.detail,
        loading: false,
      });
    }
  }

  function tokenSignIn(token: string) {
    const [user, maxAge] = decodeToken(token);

    if (!user) {
      setAuthState({
        user: null,
        error: "JWT token has expired, please get a new valid one",
        loading: false,
      });

      return 0;

    } else {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        user,
        error: null,
        loading: false,
      });

      return maxAge;
    }
  }

  async function signOut() {
    deleteCookie(COOKIE_JWT);
    delete axios.defaults.headers.common["Authorization"];

    setAuthState({
      user: null,
      error: null,
      loading: false,
    });
  }

  async function updateAccount(formData: FormData) {
    if (!axios.defaults.headers.common["Authorization"]) {
      throw new Error("Must be logged in to update account");
    }

    const {data: {token}} = await axios.putForm<TokenResponse>(makeUrl("account"), formData);
    tokenSignIn(token);
  }

  /**
   * Decodes the token to get the User object
   * @param token JWT
   * @returns [User, Expiry Time] the user object if valid, otherwise returns a null object. Also returns
   *                              the expiry time for setting Max Age on the cookie
   *
   *
   */
  function decodeToken(token: string): [User | null, number] {
    const {nbt, exp, ...user} = jwtDecode<JWTTokenInfo>(token);
    const now = dayjs().unix();

    if (nbt < now && now < exp) {
      return [user, exp - now - 3600];  // expires 1 hour before
    } else {
      return [null, 0];
    }
  }
}


export const useAuth = () => useContext(AuthenticationContext);


type UserSessionConfig = {
  redirect?: string  // redirect path, defaults to '/'
  type?: RedirectType
}

const defaultUserSessionConfig: UserSessionConfig = {
  redirect: "/account/signin",
  type: RedirectType.replace,
};

export function withUserSession(config: UserSessionConfig = defaultUserSessionConfig) {
  return function UserSessionComponent<T>(Component: React.FC<T & { user: User }>) {
    return function WrappedUserSessionComponent(props: T) {
      const {user} = useAuth();

      if (!user) {
        redirect(config.redirect || defaultUserSessionConfig.redirect!, config.type);
      }

      return <Component user={user} {...props}/>;
    };
  };
}