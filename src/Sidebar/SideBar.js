import React from "react";
import { NavLink } from "react-router-dom";
import {

  FaUserTie,
  FaRegCalendarAlt,
  FaHospitalAlt,
  FaFileAlt,
 
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { AiOutlineDashboard } from "react-icons/ai";
import "./../Sidebar/sidebar.css";

const Sidebar = () => {
  // Define static menu items without role-based filtering
  const menuItems = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <AiOutlineDashboard className="sidebar-icon" />,
    },
    {
      path: "/hospital",
      name: "Hospital Info",
      icon: <FaHospitalAlt className="sidebar-icon" />,
    },
    {
      path: "/doctor",
      name: "Doctors",
      icon: <FaUserDoctor  className="sidebar-icon" />,
    },
    {
      path: "/doctor-schedule",
      name: "Doctor Schedule",
      icon: <FaRegCalendarAlt className="sidebar-icon" />,
    },
    {
      path: "/satff",
      name: "Satff",
      icon: <FaUserTie className="sidebar-icon" />,
    },

    {
      path: "/report",
      name: "Reports",
      icon: <FaFileAlt className="sidebar-icon" />,
    },
  ];

  return (
    <div className="sidebar-container">
      {/* Logo Section */}
      <div className="sidebar-logo">
        <NavLink to="/dashboard">
          <img src="/images/HJ-HEALTH.png" alt="HJ-HEALTH"/> 
        </NavLink>
      </div>

      {/* Menu Section */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active-link" : ""}`
              }
            >
              {item.icon} {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
