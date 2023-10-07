import React from "react";
import Footer from "./Footer";
import Header from "./Header";


const MainLayout: React.FC<React.PropsWithChildren> = ({children}) => {
  return (
    <div className="bg-gray-200 h-screen flex flex-col">
      <Header/>
      <div className="container mx-auto p-2 bg-white flex-1">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;