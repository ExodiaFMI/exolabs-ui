import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  name: string;
}

const useJWT = () => {
  const [token, setTokenState] = useState<string | null>(sessionStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  const isTokenExpired = (token: string | null): boolean => {
    if (!token) return true;
    try {
      const decoded: { exp: number } = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); // Convert `exp` to milliseconds
    } catch (_error) {
      return true; // Invalid token = expired
    }
  };

  const setToken = (newToken: string) => {
    sessionStorage.setItem('token', newToken);
    setTokenState(newToken);
  };

  const removeToken = () => {
    sessionStorage.removeItem('token');
    setTokenState(null);
  };

  const getToken = () => {
    return token;
  };

  const isAuthenticated = () => {
    return token !== null && !isTokenExpired(token);
  };

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    if (isTokenExpired(token)) {
      removeToken();
    }

    const payload: { email: string; userId: string; name: string } = jwtDecode(token);
    setUser({ email: payload.email, id: payload.userId, name: payload.name });

    const handleStorageChange = () => {
      setTokenState(sessionStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [token]);

  return {
    getToken,
    setToken,
    removeToken,
    isAuthenticated,
    user,
  };
};

export default useJWT;
