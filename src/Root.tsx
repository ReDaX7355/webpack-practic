import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Context } from './context/MainContext';

const Root = () => {
  const { state } = useContext(Context);

  return (
    <div>
      <h1 className="container mx-auto px-3 py-6 text-3xl font-bold">Root</h1>
      {state?.auth ? <Navigate to="/tickets" /> : <Outlet />}
    </div>
  );
};

export default Root;
