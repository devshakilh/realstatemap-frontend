import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const RequireAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setCurrentUser(user);
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading message or spinner while the data is being fetched
  }

  if (!currentUser || (currentUser.role !== "admin" && currentUser.role !== "superadmin")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAdmin;
