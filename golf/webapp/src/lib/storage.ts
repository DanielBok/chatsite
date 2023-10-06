"use client";

type StorageType = "local" | "session"


/*
This is here to remove the pesky NextJS ReferenceError issue.

Example:
 ReferenceError: localStorage is not defined
    at getStorage (./src/lib/storage.ts:10:13)
    at Object.get (./src/lib/storage.ts:20:22)
    at getUserDataFromStorage (./src/context/user-context.tsx:24:71)
    at UserContextProvider (./src/context/user-context.tsx:31:18)

This occurs because NextJS tries to render things server-side first, and the localStorage object
does not exist in non-browser environments.
 */
class NullStorage {
  public setItem(key: string, value: string) {
  }

  public getItem(key: string) {
    return null;
  }

  public removeItem(key: string) {
  }
}


export namespace Storage {
  function getStorage(type: StorageType) {
    if (typeof window !== "undefined") {
      if (type === "local") {
        return localStorage;
      } else {
        return sessionStorage;
      }
    } else {
      return new NullStorage();
    }

  }

  export function save<T>(key: string, object: T, type: StorageType = "local") {
    getStorage(type).setItem(key, JSON.stringify(object));
  }

  export function get<T>(key: string, type: StorageType = "local"): T | null {
    const json = getStorage(type).getItem(key);
    if (!json) {
      return null;
    }

    return JSON.parse(json) as T;
  }

  export function remove(key: string, type: StorageType = "local") {
    getStorage(type).removeItem(key);
  }
}

export default Storage;
