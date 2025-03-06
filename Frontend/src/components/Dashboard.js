import React, { useState } from "react";
import "./../App.css";
import Sidebar from "./Sidebar";
import Overview from "./Overview";
import CourseManager from "./CourseManager";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("Overview");
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Placeholder for logout logic (e.g., clear auth token, redirect)
    console.log("Logged out");
    setIsProfileOpen(false);

    navigate("/");
  };

  return (
    <div className="dashboard">
      <header className="header">
        <div className="logo">
          <span className="logo-icon">LP</span> Learning Platform
        </div>
        <nav className="nav">
          <a
            href="#"
            className={activeSection === "Overview" ? "active" : ""}
            onClick={() => setActiveSection("Overview")}
          >
            Dashboard
          </a>
          <a
            href="#"
            className={activeSection === "Analytics" ? "active" : ""}
            onClick={() => setActiveSection("Analytics")}
          >
            Analytics
          </a>
          <a
            href="#"
            className={activeSection === "Courses" ? "active" : ""}
            onClick={() => setActiveSection("Courses")}
          >
            Courses
          </a>
          <a href="#">Settings</a>
        </nav>
        <div className="user-profile" onClick={handleProfileToggle}>
          <span className="user-icon">👤</span>
          <span className="user-name">User</span>
          <span className="dropdown-arrow">▼</span>
          {isProfileOpen && (
            <div className="profile-dropdown">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="layout">
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />
        <main className="main">
          <div className="content-wrapper">
            {activeSection === "Overview" && <Overview />}
            {activeSection === "Courses" && <CourseManager />}
            {activeSection === "Analytics" && (
              <div className="analytics-placeholder">
                <h2>Analytics</h2>
                <p>
                  Coming Soon - Detailed insights into your learning platform
                  usage.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
