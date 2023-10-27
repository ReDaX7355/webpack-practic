import React, { FC, useEffect, useState } from 'react';
import { getAllTickets } from './api/requests';
import Request from './types/Request';

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    getAllTickets()
      .then((res) => {
        setTickets(res);
        setIsLoading(false);
      })
      .catch((res) => {
        setError(res.status);
        // setIsLoading(false);
      });
  }, []);

  const sortTickets = (e) => {
    const nameField = e.target.dataset.name;
    console.log(nameField);
    const sortTickets = tickets.sort((a, b) => b[nameField] - a[nameField]);
    setTickets((prev) => [...sortTickets]);
  };

  return (
    <div className="px-7">
      <h3>Tickets</h3>
      <div className="container overflow-hidden overflow-x-auto m-auto">
        {!isLoading ? (
          <table className="table-tickets">
            <thead>
              <tr>
                <th data-name="ticket_number" onClick={(e) => sortTickets(e)}>
                  Номер заявки
                </th>
                <th>Тема</th>
                <th>Дата создания</th>
                <th>Тип заявки</th>
                <th>Приоритет</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket) => (
                  <tr>
                    <td>{ticket.ticket_number}</td>
                    <td>{ticket.description}</td>
                    <td>{ticket.created_at}</td>
                    <td>
                      {ticket.type_request == 'question'
                        ? 'Вопрос'
                        : 'Инцидент'}
                    </td>
                    <td>
                      {ticket.priority == '' ? (
                        'Обычный'
                      ) : (
                        <span className="text-red-600">Высокий</span>
                      )}
                    </td>
                    <td>{ticket.completed ? 'Закрыта' : 'Открыта'}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <>
            {isLoading && <div>Загрузка...</div>}
            <div>{error ? error : 'Ошибка загрузки. Сервер не доступен.'}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Tickets;
