import React from 'react';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className=" container mx-auto">
      <Link
        className="px-4 py-2 bg-primary mx-1 text-white transition hover:bg-agree"
        to="/data"
      >
        Add Ticket
      </Link>
      <Link
        className="px-4 py-2 bg-primary mx-1 text-white transition hover:bg-agree"
        to="/"
      >
        Auth
      </Link>
      <Link
        className="px-4 py-2 bg-primary mx-1 text-white transition hover:bg-agree"
        to="/tickets"
      >
        Tickets
      </Link>
    </div>
  );
};

export default App;
