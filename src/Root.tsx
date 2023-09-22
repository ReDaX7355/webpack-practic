import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <h1 className="container mx-auto px-3 py-6 text-3xl font-bold">Root</h1>
      <Outlet />
    </div>
  );
};

export default Root;
