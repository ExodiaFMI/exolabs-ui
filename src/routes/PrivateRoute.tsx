import { Navigate, Outlet } from 'react-router';
import useJWT from '../hooks/useJWT';

const PrivateRoute = () => {
  const { isAuthenticated } = useJWT();
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
