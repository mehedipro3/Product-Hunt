import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <progress className="progress w-56"></progress>;

  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace></Navigate>;
};

export default PrivateRouter;
