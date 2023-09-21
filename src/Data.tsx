import React, { useEffect, useState } from 'react';
import { getRequestsByKey, searchRequests } from './api/requests';
import { Link } from 'react-router-dom';

const Data = () => {
  const [requests, setRequests] = useState(null);

  useEffect(() => {
    setRequests(getRequestsByKey('support_iddd', 'false'));
  }, []);

  return (
    <div>
      <h3>Data</h3>
      <Link to="/">App</Link>
      <hr />
      <div className="requests">
        {requests.map((item) => (
          <div>
            <h2>{item.title}</h2>
            <div>{item.create_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
