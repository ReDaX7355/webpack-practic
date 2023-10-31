import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import { getAllTickets } from './api/requests';
import Request from './types/Request';
import IRequest from './types/Request';
import HeaderCell from './components/Tickets/HeaderCell';

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

  useEffect(() => {
    const item = document.querySelector('.table-wrapper') as HTMLElement;

    const horizontalScroll = (e) => {
      /window.addEventListener('wheel', horizontalScroll);
      if (e.deltaY > 0) item.scrollLeft += 50;
      else item.scrollLeft -= 50;
    };

    item.addEventListener('mouseover', horizontalScroll);
    
    

    return () => {
      window.removeEventListener('wheel', horizontalScroll);
    };
  }, []);

  const sortTickets = (e: SyntheticEvent) => {
    e.target = e.target.closest('th');
    const nameField = e.target.dataset.name;
    const order = e.target.dataset.order;
    let sortTickets: IRequest[];
    console.log(nameField);
    if (order == 'asc') {
      sortTickets = tickets.sort((a, b) => b[nameField] - a[nameField]);
      e.target.setAttribute('data-order', 'desc');
    } else {
      sortTickets = tickets.sort((a, b) => a[nameField] - b[nameField]);
      e.target.setAttribute('data-order', 'asc');
    }
    console.log(sortTickets);
    setTickets(() => [...sortTickets]);
  };

  return (
    <div className="px-7">
      <div className="table-wrapper container overflow-hidden overflow-x-auto m-auto shadow-lg my-5">
        {!isLoading ? (
          <table className="table-tickets">
            <thead>
              <tr>
                <HeaderCell
                  title="Номер заявки"
                  data_name="ticket_number"
                  sortFunction={sortTickets}
                />
                <th data-name="title" onClick={(e) => sortTickets(e)}>
                  Тема
                </th>
                <th data-name="created_at" onClick={(e) => sortTickets(e)}>
                  Дата создания
                </th>
                <th data-name="type_request" onClick={(e) => sortTickets(e)}>
                  Тип заявки
                </th>
                <th data-name="priority" onClick={(e) => sortTickets(e)}>
                  Приоритет
                </th>
                <HeaderCell
                  title="Статус"
                  data_name="completed"
                  sortFunction={sortTickets}
                />
              </tr>
            </thead>
            <tbody>
              {tickets &&
                tickets.map((ticket) => (
                  <tr key={ticket.ticket_number}>
                    <td>{ticket.ticket_number}</td>
                    <td>{ticket.title}</td>
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
