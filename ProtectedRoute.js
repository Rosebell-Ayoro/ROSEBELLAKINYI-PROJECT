import { Navigate } from 'react-router-dom';
import { getUser } from '../utils/auth';

const ProtectedRoute = ({ role, children }) => {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;

  if (user.role !== role) {
    return <Navigate to={`/${user.role}/dashboard`} />;
  }

  return children;
};

export default ProtectedRoute;