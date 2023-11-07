import React, { useState } from 'react';
import { useQuery } from 'react-query';

const Todos = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useQuery(
    ['todos', page],
    () => {
      return fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${page}`
      ).then((response) => response.json());
    },
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка</p>;
  if (!data) return <p>Нет данных</p>;

  return (
    <div className=" container mx-auto">
      <button onClick={() => setPage((prev) => prev - 1)}>Назад</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Далее</button>
      {data.map((todo) => (
        <div>
          <span>{todo.id} - </span>
          <span>{todo.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Todos;
