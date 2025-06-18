import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("studentName"); // or use your auth logic
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

export default PrivateRoute;