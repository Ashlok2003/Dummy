import React from "react";
import "./css/Sidebar.css";

const Sidebar = ({ activeSection, setActiveSection }) => {
  return (
    <aside className="sidebar">
      <ul>
        <li
          className={activeSection === "Overview" ? "active" : ""}
          onClick={() => setActiveSection("Overview")}
        >
          <span className="icon">📊</span> Overview
        </li>
        <li
          className={activeSection === "Courses" ? "active" : ""}
          onClick={() => setActiveSection("Courses")}
        >
          <span className="icon">📚</span> Course Manager
        </li>
        <li
          className={activeSection === "Analytics" ? "active" : ""}
          onClick={() => setActiveSection("Analytics")}
        >
          <span className="icon">📈</span> Analytics
        </li>
        <li>
          <span className="icon">🔧</span> Tools
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
