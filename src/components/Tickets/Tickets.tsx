import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
  const [sortBy, setSortBy] = useState<[string, string] | []>([]);
  const { data, isLoading, isError, error, refetch } = useQuery<ITicket[]>(
    'tickets',
    () => searchTickets(searchValue),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  const sortedData = useMemo(() => {
    if (sortBy && data) {
      if (sortBy[1] == 'asc') {
        return [...data].sort((a, b) => {
          if (a[sortBy[0]] > b[sortBy[0]]) {
            return 1;
          } else if (a[sortBy[0]] > b[sortBy[0]]) {
            return -1;
          }
          return 0;
        });
      } else {
        return [...data].sort((a, b) => {
          if (a[sortBy[0]] > b[sortBy[0]]) {
            return -1;
          } else if (a[sortBy[0]] < b[sortBy[0]]) {
            return 1;
          }
          return 0;
        });
      }
    }
    return data;
  }, [data, sortBy]);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    refetch();
  }, [searchParams]);

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
    e.target = e.target.closest('th');
    const nameField = e.target.dataset.name;
    const order = e.target.dataset.order;
    if (order == 'asc') {
      setSortBy([nameField, 'asc']);
      e.target.setAttribute('data-order', 'desc');
    } else {
      setSortBy([nameField, 'desc']);
      e.target.setAttribute('data-order', 'asc');
    }
    console.log('sort');
  };

  const handleSearch = useCallback((value: string) => {
    setSearchParams({ search: value });
    refetch();
  }, []);

  const clearSearch = () => {
    searchParams.delete('search');
    setSearchParams(searchParams);
  };
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="px-7 ">
      <SearchBar
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchFunction={handleSearch}
      />
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
                <HeaderCell dataName="title" sortFunction={sortTickets}>
                  Тема
                </HeaderCell>
                <HeaderCell dataName="created_at" sortFunction={sortTickets}>
                  Дата создания
                </HeaderCell>
                <HeaderCell dataName="type_request" sortFunction={sortTickets}>
                  Тип заявки
                </HeaderCell>
                <HeaderCell dataName="priority" sortFunction={sortTickets}>
                  Приоритет
                </HeaderCell>
                <HeaderCell dataName="completed" sortFunction={sortTickets}>
                  Статус
                </HeaderCell>
              </tr>
            </thead>
            <tbody>
              {sortedData &&
                sortedData.map((ticket: ITicket) => (
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
