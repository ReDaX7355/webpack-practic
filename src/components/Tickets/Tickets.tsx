import React, { FC, useCallback, useEffect, useState } from 'react';
import { getAllTickets, searchTickets } from './../../api/requests';
import HeaderCell from '../Tickets/TableComponents/HeaderCell';
import TableRow from '../Tickets/TableComponents/TableRow';
import ITicket from '../../types/ITicket';
import SearchBar from '../SearchBar';

const Tickets: FC = () => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setTimeout(
      () =>
        getAllTickets()
          .then((res) => {
            setTickets(res);
          })
          .catch((res) => {
            console.log(res);
            setError(res.status);
          })
          .finally(() => {
            setIsLoading(false);
          }),
      2000
    );
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
    console.log(order);
    if (order == 'asc') {
      sortTickets = tickets.sort((a, b) => b[nameField] - a[nameField]);
      e.target.setAttribute('data-order', 'desc');
    } else {
      sortTickets = tickets.sort((a, b) => a[nameField] - b[nameField]);
      e.target.setAttribute('data-order', 'asc');
    }
    console.log('sort');
    console.log(sortTickets);
    setTickets(() => [...sortTickets]);
  };

  const handleSearch = useCallback((value: string) => {
    searchTickets(value).then((data) => {
      console.log(data);
      setTickets(data);
    });
  }, []);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-7 ">
      <SearchBar searchFunction={handleSearch} />
      <div className="table-wrapper container m-auto shadow-lg my-5 rounded h-[700px] overflow-auto">
        <table className="table-tickets">
          <thead>
            <tr>
              <HeaderCell dataName="ticket_number" sortFunction={sortTickets}>
                Номер заявки
              </HeaderCell>
              <HeaderCell dataName="title">Тема</HeaderCell>
              <HeaderCell dataName="created_at">Дата создания</HeaderCell>
              <HeaderCell dataName="type_request">Тип заявки</HeaderCell>
              <HeaderCell dataName="priority">Приоритет</HeaderCell>
              <HeaderCell dataName="completed" sortFunction={sortTickets}>
                Статус
              </HeaderCell>
            </tr>
          </thead>
          <tbody>
            {tickets &&
              tickets.map((ticket) => (
                <TableRow key={ticket.ticket_number} ticket={ticket} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tickets;
