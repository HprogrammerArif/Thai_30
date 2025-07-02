
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

const role = 

  if (!token) {
   return <Navigate to='/login' replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
