import { store } from "@/store";
import { ConfigProvider } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import AppRouter from "./AppRouter.tsx";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider>
        <AppRouter/>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);
