import React from 'react';
import { getFreeReqests, getRequestById } from './api/api';

const App = () => {
  getFreeReqests();

  return (
    <div>
      <h1 className="container mx-auto text-3xl font-bold bg-red-200 py-6 px-3 dark:bg-gray-600">
        Welcome
      </h1>
    </div>
  );
};

export default App;
