
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../Pages/redux/features/auth/authSlice";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {

  const token = useSelector(useCurrentToken)

  if (!token) {
   return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
