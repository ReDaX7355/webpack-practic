import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import MainProvider, { Context } from './context/MainContext';
import App from './App';

const Root = () => {
  const { state } = useContext(Context);

  return (
    <MainProvider>
      <div className="bg-gray-50 h-[100%]">
        <h1 className="container mx-auto px-3 py-6 text-3xl font-bold">Root</h1>
        <App />
        <div className="container py-5 mx-auto">
          {state?.auth ? <Navigate to="/tickets" /> : <Outlet />}
        </div>
      </div>
    </MainProvider>
  );
};

export default Root;
