import { Navigate, useOutletContext } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useOutletContext();

  // Wait for auth check
  if (loading) return <h2>Loading...</h2>;

  // Not logged in
  if (!user) return <Navigate to="/login" replace />;

  // Role check
  if (allowedRole && user.role !== allowedRole) {
    alert("You cannot access this page!");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;