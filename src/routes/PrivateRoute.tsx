import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // replace with the actual path

interface PrivateRouteProps {
  component: React.FC;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, path }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user } = authContext;

  return (
    <Route path={path} element={!user ? <Navigate to="/login" /> : <Component />} />
  );
};

export default PrivateRoute;