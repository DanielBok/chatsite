import { AxiosError } from "axios";

declare global {
  export type LoadingState = "pending" | "error" | "success";

  export type AppAxiosError = AxiosError<{ detail: string }>;
}

export {};
