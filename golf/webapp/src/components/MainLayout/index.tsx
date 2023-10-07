import { ConfigProvider } from "antd";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";


const MainLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <ThemeProvider>
      <div className="bg-gray-200 h-screen flex flex-col">
        <Header/>
        <div className="container mx-auto p-2 bg-white flex-1">
          {children}
        </div>
        <Footer/>
      </div>
    </ThemeProvider>
  );
};

function ThemeProvider({children}: React.PropsWithChildren) {
  return <ConfigProvider theme={{
    token: {
      colorPrimary: "0D9488FF",
      colorPrimaryActive: "",
    }
  }}>
    {children}
  </ConfigProvider>;
}

export default MainLayout;