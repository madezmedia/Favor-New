import { useState, useEffect } from 'react';
import { validateToken, getAccessToken, setAccessToken, removeAccessToken } from '@/lib/auth';

export function useGoogleAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAccessToken();
      if (token) {
        const isValid = await validateToken(token);
        setIsAuthenticated(!!isValid);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleAuthSuccess = async (token: string) => {
    const isValid = await validateToken(token);
    if (isValid) {
      setAccessToken(token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleSignOut = () => {
    removeAccessToken();
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    isLoading,
    handleAuthSuccess,
    handleSignOut,
  };
}