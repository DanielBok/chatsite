"use client";

import AccountManager from "@/components/Layout/Header/AccountManager";
import { useUserContext } from "@/context/user-context";
import { Flex, Grid } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import CatLogo from "./cat-logo.svg";
import LoginHandler from "./LoginHandler";

const Header = () => {
  const {user} = useUserContext();

  return (
    <Grid width="100%" justify="between" columns="3" className="p-4 border-b-gray-300 border-b mb-6">
      <Flex justify="start" align="center" className="cursor-pointer">
        <Image src={CatLogo} alt="Cat Logo" height={64}/>
        <div className="ml-4 font-bold text-3xl text-emerald-600">
          Golf App
        </div>
      </Flex>
      <div/>
      <Flex justify="end" align="center">
        {user ? <AccountManager/> : <LoginHandler/>}
      </Flex>
    </Grid>
  );
};


export default Header;