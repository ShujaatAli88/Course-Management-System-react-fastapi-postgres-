import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/assignments")
      .then(res => res.json())
      .then(data => {
        setAssignments(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Assignments</h1>
        </header>
        <section className="dashboard-courses">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="courses-list">
              {assignments.map(a => (
                <div className="course-card" key={a.id}>
                  <h3>{a.title}</h3>
                  <p>Due: {a.due}</p>
                  <p>Status: {a.status}</p>
                  <button>View Details</button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Assignments;