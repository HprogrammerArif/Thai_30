

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useCurrentToken } from "../Pages/redux/features/auth/authSlice";

const ProtectedRoute = ({ children }) => {
const token = useSelector(useCurrentToken);
console.log({to})

  // const token = localStorage.getItem('token');

  if (!token) {
   return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
