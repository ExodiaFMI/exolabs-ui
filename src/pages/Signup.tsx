import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import SignupForm from '../components/auth/SignupForm';
import useJWT from '../hooks/useJWT';

const Signup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { isAuthenticated } = useJWT();

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSignup = async (name: string, email: string, password: string) => {
    setError('');
    setSuccess('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (!response.ok) {
        throw new Error('Signup failed');
      }
      setSuccess('Signup successful!');
      navigate('/login', { state: { message: 'Signup successful!' } });
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
        <SignupForm
          onSubmit={handleSignup}
          error={error}
          success={success}
          onLoginRedirectClick={() => navigate('/login')}
        />
      </div>
    </div>
  );
};

export default Signup;
