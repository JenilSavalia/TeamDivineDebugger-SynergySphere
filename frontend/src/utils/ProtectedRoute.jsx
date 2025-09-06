import { Navigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = getUserFromToken();

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
