import React, { FC, useCallback, useEffect, useState } from 'react';
import { getAllTickets, searchTickets } from './../../api/requests';
import HeaderCell from '../Tickets/TableComponents/HeaderCell';
import TableRow from '../Tickets/TableComponents/TableRow';
import ITicket from '../../types/ITicket';
import SearchBar from '../SearchBar';
import { useSearchParams } from 'react-router-dom';
import SearchParameters from '../SearchParameters';
import { useQuery } from 'react-query';

const Tickets: FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const {data, isLoading, isError, error, refetch} = useQuery('tickets', () => searchTickets(searchValue));

  const [searchParams, setSearchParams] = useSearchParams();
  const serachParam = searchParams.get('search');

  // useEffect(() => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     if (!serachParam) {
  //       getAllTickets()
  //         .then((res) => {
  //           setTickets(res);
  //         })
  //         .catch((res) => {
  //           console.log(res);
  //           setError(res.status);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     } else {
  //       searchTickets(serachParam)
  //         .then((res) => {
  //           setTickets(res);
  //         })
  //         .catch((res) => {
  //           console.log(res);
  //           setError(res.status);
  //         })
  //         .finally(() => {
  //           setIsLoading(false);
  //         });
  //     }
  //   }, 2000);
  // }, [searchParams]);

  const sortTickets = (e) => {
    // e.target = e.target.closest('th');
    // const nameField = e.target.dataset.name;
    // const order = e.target.dataset.order;
    // let sortTickets: ITicket[];
    // console.log(nameField);
    // console.log(order);
    // if (order == 'asc') {
    //   sortTickets = tickets.sort((a, b) => b[nameField] - a[nameField]);
    //   e.target.setAttribute('data-order', 'desc');
    // } else {
    //   sortTickets = tickets.sort((a, b) => a[nameField] - b[nameField]);
    //   e.target.setAttribute('data-order', 'asc');
    // }
    // console.log('sort');
    // console.log(sortTickets);
    // setTickets(() => [...sortTickets]);
  };

  const handleSearch = useCallback((value: string) => {
    refetch();
  }, []);

  const clearSearch = () => {
    refetch();
  };

  // if (isLoading) return <div>Загрузка...</div>;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="px-7 ">
      <SearchBar setSearchValue={setSearchValue} searchValue={searchValue} searchFunction={handleSearch} />
      <SearchParameters clearSearch={clearSearch} />

      {isLoading ? (
        <div>Загрузка...</div>
      ) : (
        <div className="table-wrapper bg-white container m-auto shadow-lg my-4 rounded h-[700px] overflow-auto">
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
              {data &&
                data.map((ticket: ITicket) => (
                  <TableRow key={ticket.ticket_number} ticket={ticket} />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Tickets;
