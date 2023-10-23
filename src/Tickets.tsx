import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { getTicketsByPage } from './api/requests';

const Tickets: FC = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getTicketsByPage(1).then((res) => setTickets(res));
  }, []);

  return (
    <div>
      <h3>Tickets</h3>

      <table className="table-tickets">
        <thead>
          <tr>
            <th>Номер заявки</th>
            <th>Тема</th>
            <th>Дата создания</th>
            <th>Статус</th>
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
