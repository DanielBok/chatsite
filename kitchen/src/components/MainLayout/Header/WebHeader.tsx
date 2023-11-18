import React from "react";
import { Link } from "react-router-dom";


export default function WebHeader() {
  return (
    <div className="flex-1 ml-8 mr-4 items-center hidden md:flex text-lg text-blue-700 font-bold">
      <Link to="/cookbook" className="hover:text-blue-400">
        Cookbook
      </Link>
    </div>
  );
}
