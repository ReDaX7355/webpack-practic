import React from 'react';
import { getRequestsByKey, searchRequests } from './api/requests';

const App = () => {
  getRequestsByKey('support_id', 'false');
  const [searchResults, setSearchResults] = React.useState([]);

  const hundleSearch = (value) => {
    setTimeout(() => {
      const resulsts = searchRequests(value);
      setSearchResults(resulsts);
    }, 1000);
  };

  return (
    <div>
      <h1 className="container mx-auto text-3xl font-bold bg-red-200 py-6 px-3 dark:bg-gray-600">
        Welcome
      </h1>
      <input type="text" onChange={(e) => hundleSearch(e.value)} />
    </div>
  );
};

export default App;
