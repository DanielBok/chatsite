"use client";

import Storage from "@/lib/storage";
import React, { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";

export const STORAGE_KEY_USER = "STORAGE_KEY_USER";

export type User = {
  id: number
  username: string
  firstName: string
  lastName: string
  isAdmin: boolean
}

export type UserContextDataType = {
  token: string
  user: User
}

type UserContextType = {
  user?: User
  token?: string
  login: (user: User, token: string) => void
  logout: () => void
}

const UserContext = createContext<UserContextType>({
  login: function () {
  },
  logout: function () {
  },
});

function getUserDataFromStorage() {
  const info = Storage.get<UserContextDataType>(STORAGE_KEY_USER);
  if (!info) return;

  const token = jwtDecode(info.token) as { id: number, nbt: number, exp: number };
  const now = dayjs().unix();

  // checks if token is expired
  if (now < token.nbt || now > token.exp) {
    Storage.remove(STORAGE_KEY_USER);
    return;
  }

  return info;
}


export const UserContextProvider = ({children}: React.PropsWithChildren) => {
  useEffect(() => {
    const info = getUserDataFromStorage();
    if (info) {
      setUser(info?.user);
      setToken(info?.token);
    }
  }, []);

  const [user, setUser] = useState<User>();
  const [, setToken] = useState<string>();


  return (
    <UserContext.Provider value={{user, login, logout}}>
      {children}
    </UserContext.Provider>);

  function login(user: User, token: string) {
    setUser(user);
    setToken(token);
  }

  function logout() {
    Storage.remove(STORAGE_KEY_USER);
    setUser(undefined);
    setToken(undefined);
  }
};

export const useUserContext = () => useContext(UserContext);
