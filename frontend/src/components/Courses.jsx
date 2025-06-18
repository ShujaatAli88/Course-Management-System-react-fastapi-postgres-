import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/courses")
      .then(res => res.json())
      .then(data => {
        setCourses(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Enrolled Courses</h1>
        </header>
        <section className="dashboard-courses">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="courses-list">
              {courses.map(course => (
                <div className="course-card" key={course.id}>
                  <h3>{course.title}</h3>
                  <p><strong>Instructor:</strong> {course.instructor}</p>
                  <p><strong>Schedule:</strong> {course.schedule}</p>
                  <p><strong>Credits:</strong> {course.credits}</p>
                  <span className={`course-status ${course.status.toLowerCase()}`}>{course.status}</span>
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

export default Courses;