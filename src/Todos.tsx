import React from 'react';
import { useQuery } from 'react-query';

const Todos = () => {
  const { data, isLoading, isError } = useQuery('todos', () => {
    fetch('https://jsonplaceholder.typicode.com/todos').then((res) =>
      res.json()
    );
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка</p>;
  if (!data) return <p>Нет данных</p>;

  return (
    <div className=" container mx-auto">
      {data.map((todo) => (
        <li>
          <p>{todo.id}</p>
          <p>{todo.title}</p>
        </li>
      ))}
    </div>
  );
};

export default Todos;
