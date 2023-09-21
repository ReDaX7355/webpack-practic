import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => {
  return (
    <div>
      <h1 className="responsive mx-auto text-3xl font-bold bg-red-200 py-6 px-3 dark:bg-gray-600">
        Root
      </h1>
      <Outlet />
    </div>
  );
};

export default Root;
