import Forbidden from "@/components/MainLayout/Forbidden";
import { useUser } from "@/store/account/hooks";
import { ConfigProvider } from "antd";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

type ProtectionProps = {
  redirectTo: string
  adminOnly?: boolean
}

type Props = React.PropsWithChildren<{
  protection?: ProtectionProps
}>

const MainLayout: React.FC<Props> = ({children, protection}) => {
  const renderedParts = children || <Outlet/>;

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
          {
            protection
              ? (
                <Protection {...protection}>
                  {renderedParts}
                </Protection>
              )
              : renderedParts
          }
        </div>
        <Footer/>
      </div>
    </ConfigProvider>
  );
};

const Protection: React.FC<React.PropsWithChildren<ProtectionProps>> = (
  {
    redirectTo,
    adminOnly = false,
    children,
  }) => {
  const user = useUser();
  if (!user) {
    return <Navigate to={redirectTo} replace/>;
  }

  if (adminOnly && !user!.isAdmin) {
    return <Forbidden/>;
  }
  return <>{children}</>;

};

export default MainLayout;