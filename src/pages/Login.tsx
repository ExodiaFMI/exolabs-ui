import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import LoginForm from '../components/auth/LoginForm';
import useJWT from '../hooks/useJWT';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [message, setMessage] = useState('');
  const { isAuthenticated } = useJWT();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location.state]);

  const handleLogin = async (email: string, password: string) => {
    setError('');
    setSuccess('');
    setMessage(''); // Clear any previous messages
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      sessionStorage.setItem('token', data.token);
      setSuccess('Login successful!');
      navigate('/dashboard'); // Redirect to a protected route
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <LoginForm
          onSubmit={handleLogin}
          error={error}
          success={success}
          message={message}
          onSignUpRedirectClick={() => navigate('/signup')}
        />
      </div>
    </div>
  );
};

export default Login;
