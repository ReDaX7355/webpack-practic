import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className=" container mx-auto">
      <Link className="px-4 py-2 bg-secondary mx-1 hover:bg-primary" to="/data">
        Add Ticket
      </Link>
      <Link className="px-4 py-2 bg-secondary mx-1 hover:bg-primary" to="/">
        Auth
      </Link>
      <Link
        className="px-4 py-2 bg-secondary mx-1 hover:bg-primary"
        to="/tickets"
      >
        Tickets
      </Link>
    </div>
  );
};

export default App;
