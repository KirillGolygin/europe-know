import React from 'react';

import { Navigate } from 'react-router-dom';
import { IUser } from '../interfaces/user';

interface ProtectedRouteProps {
  role: IUser | null;
  children: React.ReactNode;
  to: string;
}

const ProtectedRoute = ({ role, children, to }: ProtectedRouteProps) => {
  if (!role) {
    return <Navigate to={to} replace />;
  }
  return children;
};

export default ProtectedRoute;
