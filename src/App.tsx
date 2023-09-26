import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  const foo = { adas: 23 };
  return (
    <div>
      <h3>App</h3>
      <Link to="/data">Data {foo}</Link>
    </div>
  );
};

export default App;
