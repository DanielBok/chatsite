import { User } from "@/store/account/types";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";

export function decodeToken(token: string): [User | null, number] {
  const {nbt, exp, ...user} = jwtDecode<User & { nbt: number, exp: number }>(token);
  const now = dayjs().unix();

  if (nbt < now && now < exp) {
    return [user, exp - now - 3600];  // expires 1 hour before
  } else {
    return [null, 0];
  }
}