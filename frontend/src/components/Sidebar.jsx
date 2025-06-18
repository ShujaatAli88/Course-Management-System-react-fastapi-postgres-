import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBook, FaUserGraduate, FaClipboardList, FaChartBar, FaUser, FaCog, FaSignOutAlt, FaHome } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-logo">
        <h2 className="manage-courses-title">
          <span role="img" aria-label="courses" style={{ marginRight: 8 }}>📚</span>
          Manage Courses
        </h2>
      </div>
      <nav className="dashboard-nav">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}><FaHome /> Dashboard</Link>
        <Link to="/courses" className={location.pathname === "/courses" ? "active" : ""}><FaBook /> Courses</Link>
        <Link to="/assignments" className={location.pathname === "/assignments" ? "active" : ""}><FaClipboardList /> Assignments</Link>
        <Link to="/grades" className={location.pathname === "/grades" ? "active" : ""}><FaChartBar /> Grades</Link>
        <Link to="/students" className={location.pathname === "/students" ? "active" : ""}><FaUserGraduate /> Students</Link>
        <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}><FaUser /> Profile</Link>
        <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}><FaCog /> Settings</Link>
      </nav>
      <div className="dashboard-logout">
        <Link to="/logout">
          <span role="img" aria-label="logout">🚪</span> Logout
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;