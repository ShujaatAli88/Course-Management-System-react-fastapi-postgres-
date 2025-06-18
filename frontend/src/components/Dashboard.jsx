import React from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Dashboard() {
  // Example: You can fetch or compute user data here if needed

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Welcome, Student!</h1>
          <div className="dashboard-profile">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile" />
            <span>{localStorage.getItem("studentName") || "Student"}</span>
          </div>
        </header>
        <section className="dashboard-widgets">
          <div className="dashboard-widget">
            <span className="widget-icon">📚</span>
            <div>
              <h2>5</h2>
              <p>Active Courses</p>
            </div>
          </div>
          <div className="dashboard-widget">
            <span className="widget-icon">📝</span>
            <div>
              <h2>12</h2>
              <p>Assignments Due</p>
            </div>
          </div>
          <div className="dashboard-widget">
            <span className="widget-icon">📊</span>
            <div>
              <h2>89%</h2>
              <p>Average Grade</p>
            </div>
          </div>
          <div className="dashboard-widget">
            <span className="widget-icon">🎓</span>
            <div>
              <h2>120</h2>
              <p>Students Enrolled</p>
            </div>
          </div>
        </section>
        <section className="dashboard-courses">
          <h2>My Courses</h2>
          <div className="courses-list">
            <div className="course-card">
              <h3>React Development</h3>
              <p>Instructor: Jane Smith</p>
              <button>View Details</button>
            </div>
            <div className="course-card">
              <h3>Python for Data Science</h3>
              <p>Instructor: Mark Lee</p>
              <button>View Details</button>
            </div>
            <div className="course-card">
              <h3>Database Systems</h3>
              <p>Instructor: Emily Clark</p>
              <button>View Details</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;