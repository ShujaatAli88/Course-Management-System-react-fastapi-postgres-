import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear(); // Clear all localStorage
    navigate("/", { replace: true }); // Redirect to login
  }, [navigate]);

  return null;
}

export default Logout;