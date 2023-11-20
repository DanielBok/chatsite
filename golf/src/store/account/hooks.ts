import { useRootSelector } from "@/store";

export const useUser = () => useRootSelector((s) => s.account.user);

export const useAccount = () => useRootSelector(s => s.account);