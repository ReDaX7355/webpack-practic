import axios from 'axios';

const SERVER_URL: string = 'http://localhost:3000';

async function getTickets(query: string, endpoint = SERVER_URL) {
  try {
    // Определяем наличие строки запроса
    query ? (query = `?${query}`) : (query = '');

    const response = await axios.get(`${endpoint}/tickets${query}`);

    if (response.status != 200) throw new Error(response.statusText);

    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err.message || err);
  }
}

export const getTicketsByPage = (page: number) =>
  getTickets(`_page=${page}&_limit=10`);

export const getTicketById = (id: string | number) => getTickets(`id=${id}`);

export const getTicketsByKey = (key: string, value: string) =>
  getTickets(`${key}=${value}`);

export const searchTickets = (value: string | number) =>
  getTickets(`q=${value}`);

// async function getTodos(query: string, endpoint = SERVER_URL) {
//   try {
//     // Определяем наличие строки запроса
//     query ? (query = `?${query}`) : (query = '');

//     const response = await fetch(`${endpoint}${query}`);

//     if (!response.ok) throw new Error(response.statusText);

//     const json = await response.json();
//     console.log(json);
//     return json;
//   } catch (err) {
//     console.error(err.message || err);
//   }
// }

// // Получение задачи по ключу
// export const getTodoByKey = (key, val) => getTodos(`${key}=${val}`);

// // По `id`
// export const getTodoById = (id) => getTodoByKey('id', id);
// getTodoById('2');

// // По имени автора
// export const getTodoByAuthorName = (name) => getTodoByKey('meta.author', name);
// getTodoByAuthorName('John');

// // Получение активных задач
// export const getActiveTodos = () => getTodoByKey('complete', false);
// getActiveTodos();
