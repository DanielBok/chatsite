import CatLogo from "@/components/MainLayout/Header/cat-logo.svg";
import { APP_NAME } from "@/constants";
import { Col, Row } from "antd";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className="h-24 sticky z-10 top-0 bg-teal-600 border-b-gray-400 border-b shadow-xl">
      <Row className="p-4 text-white">
        <Col span={12}>
          <Row align="middle" justify="start">
            <Image src={CatLogo} alt="Cat Logo" height={64} width={64}/>
            <div className="ml-4 font-bold text-3xl">
              {APP_NAME}
            </div>
          </Row>
        </Col>
        <Col span={12}>
          <Row justify="end" align="middle">
            <Col className="h-full">
              Login
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Header;