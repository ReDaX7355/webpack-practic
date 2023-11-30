import React from 'react';
import { Outlet } from 'react-router-dom';
import MainProvider from './context/MainContext';
import App from './App';
import Modal from './components/Modal';

const Root = () => {
  return (
    <MainProvider>
      <div className="bg-gray-100 h-[100%]">
        <h1 className="container mx-auto px-3 py-6 text-3xl font-bold">Root</h1>
        <App />
        <div className="container py-10 mx-auto">
          <Outlet />
        </div>
      </div>
    </MainProvider>
  );
};

export default Root;
