import { Navigate, Outlet } from 'react-router';
import useJWT from '../hooks/useJWT';
import Layout from '../layout/layout';

const PrivateRoute = () => {
  const { isAuthenticated } = useJWT();
  return isAuthenticated() ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
