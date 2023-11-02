import React, { FC, useEffect, useState } from 'react';
import { getAllTickets } from './../../api/requests';
import HeaderCell from '../Tickets/TableComponents/HeaderCell';
import TableRow from '../Tickets/TableComponents/TableRow';
import ITicket from '../../types/ITicket';

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
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
    const scrollContainer = document.querySelector(
      '.table-wrapper'
    ) as HTMLElement;

    const horizontalScroll = (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY / 2;
    };

    scrollContainer.addEventListener('wheel', horizontalScroll);

    return () => {
      window.removeEventListener('mouseleave', horizontalScroll);
    };
  }, []);

  const sortTickets = (e) => {
    e.target = e.target.closest('th');
    const nameField = e.target.dataset.name;
    const order = e.target.dataset.order;
    let sortTickets: ITicket[];
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
      <div className="table-wrapper container overflow-hidden overflow-x-auto m-auto shadow-lg my-5 rounded-lg overflow-hidden">
        {isLoading ? (
          <>
            {<div>Загрузка...</div>}
            <div>{error ? error : 'Ошибка загрузки. Сервер не доступен.'}</div>
          </>
        ) : (
          <table className="table-tickets">
            <thead>
              <tr>
                <HeaderCell
                  data_name="ticket_number"
                  sortFunction={sortTickets}
                >
                  Номер заявки
                </HeaderCell>
                <HeaderCell data_name="title">Тема</HeaderCell>
                <HeaderCell data_name="created_at">Дата создания</HeaderCell>
                <HeaderCell data_name="type_request">Тип заявки</HeaderCell>
                <HeaderCell data_name="priority">Приоритет</HeaderCell>
                <HeaderCell data_name="completed" sortFunction={sortTickets}>
                  Статус
                </HeaderCell>
              </tr>
            </thead>
            <tbody>
              {tickets && tickets.map((ticket) => <TableRow key={ticket.ticket_number} ticket={ticket} />)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Tickets;
