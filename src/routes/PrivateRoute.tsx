import { Navigate, Outlet } from 'react-router';

const PrivateRoute = () => {
  const token = sessionStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
