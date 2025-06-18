import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import './Profile.css'; // Assuming you have a Profile.css for styling

export default function StudentLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("studentName", data.name); // Store the name
        localStorage.setItem("studentEmail", email); // <-- Save the entered email
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Login error");
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-card">
        <h2 className="login-title">NUST</h2>
        <form onSubmit={handleLogin} className="login-form">
          <div className="login-group">
            {/* <label htmlFor="email" className="login-label">Email Address</label> */}
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="student@example.com"
              required
              className="login-input"
            />
          </div>
          <div className="login-group">
            {/* <label htmlFor="password" className="login-label">Password</label> */}
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="login-input"
            />
          </div>
          <button type="submit" className="login-button">
            <LogIn className="w-5 h-5" />
            Log In
          </button>
        </form>
      </div>
    </motion.div>
  );
}
