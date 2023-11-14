import { Outlet } from "react-router-dom";

import Header from "../Header/Header";

import "./Layout.scss";

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="layout-wrapper">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
