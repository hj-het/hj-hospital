import React from "react";
import Sidebar from "./SideBar";
import "./layout.css";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Sidebar /> 
      <div className="main-content">
        <Header/>
        {children} 
      </div>
    </div>
  );
};

export default Layout;
