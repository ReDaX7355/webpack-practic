import React, { FC, ReactElement, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Context } from '../context/MainContext';

interface ProtectedRouteProps {
  children: ReactElement;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { state } = useContext(Context);

  if (!state?.auth) {
    return <Navigate to="/401" replace />;
  }

  return children;
};

export default ProtectedRoute;
