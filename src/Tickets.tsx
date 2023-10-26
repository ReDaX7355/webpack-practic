import React, { FC, useEffect, useState } from 'react';
import { getAllTickets } from './api/requests';
import Request from './types/Request';

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<Request[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllTickets()
      .then((res) => setTickets(res))
      .catch((res) => setError(res.status));
  }, []);

  return (
    <div className="px-7">
      <h3>Tickets</h3>
      <div className="container overflow-hidden overflow-x-auto m-auto">
        {tickets ? (
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
                  <td>{ticket.ticket_number}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.created_at}</td>
                  <td>{ticket.completed ? 'Закрыта' : 'Открыта'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>{error ? error : 'Загрузка'}</div>
        )}
      </div>
    </div>
  );
};

export default Tickets;
