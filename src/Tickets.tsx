import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

const Tickets: FC = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/requests')
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  let TABLE_COLUMNS = [
    {
      label: 'id',
      sort: 'default',
    },
    {
      label: 'title',
      sort: 'default',
    },
    {
      label: 'status',
      sort: 'default',
    },
  ];

  const sortTickets = () => {
    setTickets((prev) => [...prev.sort((a, b) => b.id - a.id)]);
    console.log(tickets);
  };

  return (
    <div>
      <h3>Tickets</h3>

      <table className="table-tickets">
        <thead>
          <tr>
            <th onClick={() => sortTickets()}>Номер заявки</th>
            <th>Тема</th>
            <th>Дата создания</th>
            <th onClick={() => sortTickets()}>Статус</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.created_at}</td>
              <td>{ticket.completed ? 'Закрыта' : 'Открыта'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
