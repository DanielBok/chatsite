declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      REACT_APP_BACKEND_BASE_URL: string;
    }
  }
}
