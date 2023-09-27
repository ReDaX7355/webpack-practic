import React, { useEffect, useState } from 'react';
import { getRequestsByKey } from './api/requests';
import { Link } from 'react-router-dom';

const Data = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/requests/?_expand=user')
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

  return (
    <div>
      <h3>Data</h3>
      <Link to="/">App</Link>
      <hr />
      <div>
        {requests.map((item) => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <div>{item.create_date}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Data;
