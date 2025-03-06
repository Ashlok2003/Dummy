import React from "react";
import "./css/Overview.css";

const Overview = () => {
  return (
    <section className="overview">
      <div className="welcome-card">
        <h2>Welcome to Grok 3 Dashboard</h2>
        <p>March 06, 2025</p>
        <button>Quick Start</button>
      </div>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Users Active</h3>
          <p>
            1,245 <span className="trend up">+12%</span>
          </p>
        </div>
        <div className="stat-card">
          <h3>Queries Processed</h3>
          <p>
            5,678 <span className="trend down">-3%</span>
          </p>
        </div>
        <div className="stat-card">
          <h3>Courses Available</h3>
          <p>
            15 <span className="trend gold">+2</span>
          </p>
        </div>
        <div className="stat-card">
          <h3>System Uptime</h3>
          <p>
            99.98% <span className="trend stable">Stable</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Overview;
