import React from "react";
import { Outlet } from "react-router-dom";

import HeaderBar from "../components/HeaderBar";

const RootLayout = () => {
  return (
    <div>
      <HeaderBar />
      <Outlet />
    </div>
  );
};

export default RootLayout;
