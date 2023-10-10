import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import React from "react";
import AccountServiceSelector from "./AccountServiceSelector";
import "./AccountServiceSelector";

export default function AccountHandler() {
  const {loading, user} = useAuth();

  if (loading) return null;

  if (user) return <AccountServiceSelector/>;

  return (
    <Link href="/account/signin"
          className="text-white hover:text-gray-100 text-lg h-full items-center flex">
      Log in
    </Link>
  );
}
