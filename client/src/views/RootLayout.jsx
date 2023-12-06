import { Outlet } from "react-router-dom";
import Navbar from "./common/Navbar";
import { useEffect } from "react";
import { useUser } from "../contexts/userContext";

const RootLayout = () => {
  let { getUser } = useUser();
  useEffect(() => {
    getUser();
  }, []);
  return (
    <main className="landing-page    h-full w-full flex flex-col overflow-scroll overflow-x-hidden">
      <Navbar />
      <Outlet />
    </main>
  );
};

export default RootLayout;
