import Startup from "@/components/Startup";
import { BACKEND_BASE_URL } from "@/constants";
import router from "@/router";
import store from "@/store";
import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";


axios.defaults.baseURL = BACKEND_BASE_URL;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Startup>
        <RouterProvider router={router}/>
      </Startup>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
