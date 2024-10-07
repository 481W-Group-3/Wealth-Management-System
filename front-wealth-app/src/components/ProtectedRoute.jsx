import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../utils/useAuth.jsx';
import Spinner from './spinner'; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const checkAuth = async () => {
      await new Promise(resolve => setTimeout(resolve, 200)); // Small delay to ensure auth state is updated
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
    return <Spinner size="8" color="blue-500" type="border" />;
  }

  console.log("ProtectedRoute: isAuthenticated =", isAuthenticated);
 
  if (!isAuthenticated) {
    console.log("ProtectedRoute: Redirecting to login");
    return <Navigate to="/" replace />;
  }
 
  console.log("ProtectedRoute: Rendering children");
  return children;
};

export default ProtectedRoute;