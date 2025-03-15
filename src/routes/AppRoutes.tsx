import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import StudyTheoryMode from '../pages/study/StudyTheoryMode';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/study" element={<StudyTheoryMode />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
