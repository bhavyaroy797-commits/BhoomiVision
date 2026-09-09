import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { hasRoleAccess } from '../utils/roleAccessMap';

export const RequireRole = ({ allowedRoles, children }) => {
  const { user } = useAuth();
  const role = user?.role;

  if (!role) {
    return <Navigate to="/auth/public/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to public dashboard if authorized for public but trying to access restricted page
    return <Navigate to="/dashboard/public" replace />;
  }

  return children;
};
