import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
