import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Grades.css";

function Grades() {
  const [gradesData, setGradesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/grades")
      .then((res) => res.json())
      .then((data) => {
        setGradesData(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Grades</h1>
        </header>
        <section className="grades-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            gradesData.map((course, idx) => (
              <div className="grades-card" key={idx}>
                <h2>{course.course}</h2>
                <p>
                  <strong>Instructor:</strong> {course.instructor}
                </p>
                <table className="grades-table">
                  <thead>
                    <tr>
                      <th>Assignment</th>
                      <th>Score</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {course.assignments.map((a, i) => (
                      <tr key={i}>
                        <td>{a.name}</td>
                        <td>{a.score}</td>
                        <td>{a.total}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>
                        <strong>Overall Grade</strong>
                      </td>
                      <td>
                        <strong>{course.overall}%</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default Grades;