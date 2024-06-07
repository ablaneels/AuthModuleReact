import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // replace with the actual path

interface PublicRouteProps {
  restricted: boolean;
  component: React.FC;
  path: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ restricted, component: Component, path }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { user } = authContext;

  return (
    <Route path={path} element={user && restricted ? <Navigate to="/dashboard" /> : <Component />} />
  );
};

export default PublicRoute;