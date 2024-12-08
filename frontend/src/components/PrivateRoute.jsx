import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = !!localStorage.getItem('authToken'); // Check if token exists
  return isAuth ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
