import { RootState, useRootSelector } from "@/store";

export const useUser = () => useRootSelector((s: RootState) => s.account.user);

export const useAccount = () => useRootSelector(s => s.account);