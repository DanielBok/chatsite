"use client";

import { ConfigProvider } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";


const MainLayout: React.FC<React.PropsWithChildren> = () => {
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: "0D9488FF",
        colorPrimaryActive: "",
      }
    }}>
      <div className="bg-gray-200 min-h-screen flex flex-col">
        <Header/>
        <div className="lg:container mx-auto p-2 bg-white flex-1">
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </ConfigProvider>
  );
};

export default MainLayout;