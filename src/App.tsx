import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <h3>App</h3>
      <Link to="/data">Data</Link>
      <Link to="/auth">Auth</Link>
      <Link to="/tickets">Tickets</Link>
    </div>
  );
};

export default App;
