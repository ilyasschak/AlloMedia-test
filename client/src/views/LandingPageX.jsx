import { useState } from "react";
import Navbar from "./common/Navbar"
import { useUser } from "../contexts/userContext";
import SignUp from "./signPages/SignUp";
import Login from "./signPages/Login";
import { Outlet } from "react-router-dom";

const LandingPage = () => {

  return (
      <div className="w-full flex max-w-screen-xl flex-wrap items-center justify-between mx-auto p-4 flex-1 gap-7">
        <div className="flex flex-col gap-12 justify-center flex-1">
         <Outlet />
        </div>
        <div className="flex flex-col gap-12 justify-center flex-1">
          <h1 className="font-extrabold text-white text-7xl"><span className="text-brand">Delivering</span> <br/>Convenience <br/>to Your Doorstep!</h1>
        </div>
      </div>
  )
}

export default LandingPage