import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Dashboard.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("studentEmail");

  useEffect(() => {
    if (!email) {
      setLoading(false);
      return;
    }
    fetch("http://localhost:8000/api/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Profile not found");
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [email]);

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>My Profile</h1>
        </header>
        <section className="profile-details">
          {loading ? (
            <p>Loading...</p>
          ) : profile ? (
            <div className="profile-card">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Profile"
                className="profile-avatar"
              />
              <h2>{profile.name}</h2>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <strong>Email:</strong>
                    </td>
                    <td>{profile.email}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Age:</strong>
                    </td>
                    <td>{profile.age}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Country:</strong>
                    </td>
                    <td>{profile.country}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Department:</strong>
                    </td>
                    <td>{profile.dept}</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Address:</strong>
                    </td>
                    <td>{profile.address}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>Profile not found.</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;