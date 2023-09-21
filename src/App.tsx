import React from 'react';
import { getRequestsByKey, searchRequests } from './api/requests';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h3>App</h3>
      <Link to="/data">Data</Link>
    </div>
  );
};

export default App;
