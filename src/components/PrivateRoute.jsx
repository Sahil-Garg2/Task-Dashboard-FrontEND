import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user ,loading} = useAuth();

  if (loading) {
    return <div>loading</div>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const LoginRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>loading</div>;
  }
  if (user && user.role.name === 'admin') {
    return <Navigate to="/admin" />;
  }
  else if(user && user.role.name === 'user') {
    return <Navigate to="/user" />;
  }

  return children;
};

export default PrivateRoute;
