import React from 'react';
import { Navigate, Route } from 'react-router-dom';

function PrivateRoute({ element, isAuthenticated, fallbackPath }) {
  return isAuthenticated ? element : <Navigate to={fallbackPath} />;
}

export default PrivateRoute;
