import React from "react";
import SideBar from "../components/shared/SideBar";
import MobilNav from "../components/shared/MobilNav";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <SideBar />
      <MobilNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
