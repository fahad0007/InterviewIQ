import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAuth } from "../context/AuthContext";
import { getUserRole } from "../services/userService";
import TableSkeleton from "./TableSkeleton";

function AdminRoute({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      } catch (error) {
        console.error("Error checking admin role:", error);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="loading-screen">
       <TableSkeleton rows={6}/>
       
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "admin") {
  return (
    <div className="access-denied">
      <h2>Access Denied</h2>

      <p>
        You don't have permission to access
        the Admin Panel.
      </p>

      <button
        onClick={() => {
          window.location.href = "/";
        }}
      >
        Go to Dashboard
      </button>
    </div>
  );
}

  return children;
}

export default AdminRoute;