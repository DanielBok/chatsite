import type { User, UserContextDataType } from "@/context/user-context";
import { STORAGE_KEY_USER, useUserContext } from "@/context/user-context";
import { makeURL } from "@/lib/api";
import Storage from "@/lib/storage";
import axios, { AxiosError, AxiosResponse } from "axios";
import useSWRMutation from "swr/mutation";

type Credentials = {
  username: string;
  password: string;
}

export function useLogin() {
  const {login} = useUserContext();

  return useSWRMutation<User, string, string, Credentials>(makeURL("/account/login"), loginUser);

  async function loginUser(_: string, {arg: auth}: { arg: Credentials }) {
    try {
      const {data} = await axios.get(makeURL("/account/login"), {auth});
      const {id, first_name: firstName, last_name: lastName, is_admin: isAdmin, token} = data;
      const user: User = {id, firstName, lastName, isAdmin, username: auth.username};

      Storage.save<UserContextDataType>(STORAGE_KEY_USER, {user, token});
      login(user, token);
      return user;
    } catch (e) {
      const {data} = (e as AxiosError).response as AxiosResponse;
      throw data.detail;
    }
  }
}