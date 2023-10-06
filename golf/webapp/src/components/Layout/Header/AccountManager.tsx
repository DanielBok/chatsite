"use client";

import { useUserContext } from "@/context/user-context";
import { CaretDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu, Flex } from "@radix-ui/themes";
import React from "react";


const AccountManager = () => {
  const {user, logout} = useUserContext();
  if (typeof user === "undefined") {
    logout();
    return null;
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Flex className="text-xl border-b cursor-pointer" align="center" gap="2">
          <span>Hello</span>
          <span className="text-emerald-600">{user.firstName}</span>
          <CaretDownIcon style={{width: 25, height: 25}}/>
        </Flex>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit Details</DropdownMenu.Item>
        <DropdownMenu.Separator/>
        <DropdownMenu.Item onClick={logout}>Logout</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default AccountManager;
