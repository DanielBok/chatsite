import { useAccount } from "@/store/account/hooks";
import React from "react";
import { Link } from "react-router-dom";
import AccountServiceSelector from "./AccountServiceSelector";
import "./AccountServiceSelector";

export default function AccountHandler() {
  const {user, loading} = useAccount();

  if (loading) return null;

  if (user) return <AccountServiceSelector/>;

  return (
    <Link to="/account/signin"
          className="text-white hover:text-gray-100 text-lg h-full items-center flex">
      Log in
    </Link>
  );
}
