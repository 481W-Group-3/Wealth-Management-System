import { useState, useEffect, useCallback } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('user');
  });

  const checkAuth = useCallback(() => {
    const user = localStorage.getItem('user');
    console.log("User from localStorage:", user);
    setIsAuthenticated(!!user);
  }, []);

  useEffect(() => {
    console.log("useAuth effect is running");
    checkAuth();
  }, [checkAuth]);

  console.log("useAuth hook, isAuthenticated:", isAuthenticated);
  return { isAuthenticated, checkAuth };
};

export default useAuth;