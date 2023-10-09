import AccountHandler from "@/components/MainLayout/Header/AccountHandler";
import CatLogo from "@/components/MainLayout/Header/cat-logo.png";
import { APP_NAME } from "@/constants";
import { useAuth } from "@/context/auth-context";
import { Col, Row } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";


const Header = () => {
  const {loading, user} = useAuth();

  return (
    <div className="h-24 sticky z-10 top-0 bg-teal-600 border-b-gray-400 border-b shadow-xl">
      <Row className="p-4 text-white">
        <Col span={12}>
          <Link href="/" className="cursor-pointer flex align-middle">
            <Image src={CatLogo} alt="Cat Logo" height={64} width={64}/>
            <div className="ml-4 font-bold text-3xl text-white hover:text-gray-100 flex items-center">
              {APP_NAME}
            </div>
          </Link>
        </Col>
        <Col span={12}>
          <div className="flex justify-end items-center h-full">
            {
              !loading && <>
                {
                  user ? (
                    <AccountHandler/>
                  ) : (
                    <Link href="/account/signin"
                          className="text-white hover:text-gray-100 text-lg h-full items-center flex">
                      Log in
                    </Link>
                  )
                }
              </>
            }
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Header;