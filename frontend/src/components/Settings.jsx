import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Settings.css";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState(localStorage.getItem("studentEmail") || "");
  const [notifications, setNotifications] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch user settings on mount
  useEffect(() => {
    if (!email) return;
    fetch("http://localhost:8000/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(data => {
        setName(data.name || "");
        setNotifications(data.notifications ?? true);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [email]);

  // Update profile handler
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, notifications }),
    })
      .then(res => res.json())
      .then(() => alert("Profile updated!"))
      .catch(() => alert("Failed to update profile."));
  };

  // Change password handler
  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    fetch("http://localhost:8000/api/settings/password", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, current_password: currentPassword, new_password: newPassword }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert("Password changed!");
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        } else {
          alert(data.detail || "Failed to change password.");
        }
      })
      .catch(() => alert("Failed to change password."));
  };

  // Notification toggle
  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  // Delete account handler
  const handleDeleteAccount = () => {
    if (!window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) return;
    fetch("http://localhost:8000/api/settings", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then(res => res.json())
      .then(() => {
        alert("Account deleted!");
        localStorage.clear();
        window.location.href = "/";
      })
      .catch(() => alert("Failed to delete account."));
  };

  return (
    <div className="dashboard-root">
      <Sidebar />
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h1>Account Settings</h1>
        </header>
        <section className="settings-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <form className="settings-card" onSubmit={handleProfileUpdate}>
                <h2>Update Profile</h2>
                <label>
                  Name
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Email
                  <input
                    type="email"
                    value={email}
                    disabled
                  />
                </label>
                <button type="submit">Save Changes</button>
              </form>
              <form className="settings-card" onSubmit={handlePasswordChange}>
                <h2>Change Password</h2>
                <label>
                  Current Password
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                  />
                </label>
                <label>
                  New Password
                  <input
                    type="password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    required
                  />
                </label>
                <label>
                  Confirm New Password
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    required
                  />
                </label>
                <button type="submit">Change Password</button>
              </form>
              <div className="settings-card">
                <h2>Notifications</h2>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={handleNotificationChange}
                  />
                  <span className="slider"></span>
                </label>
                <span style={{ marginLeft: "12px" }}>Enable Email Notifications</span>
              </div>
              <div className="settings-card danger-zone">
                <h2>Danger Zone</h2>
                <button className="danger" onClick={handleDeleteAccount}>Delete Account</button>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default Settings;