const SERVER_URL: string = 'http://localhost:3000';

async function getRequests(query: string, endpoint = SERVER_URL) {
  try {
    // Определяем наличие строки запроса
    query ? (query = `?${query}`) : (query = '');

    const response = await fetch(`${endpoint}/requests${query}`);

    if (!response.ok) throw new Error(response.statusText);

    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error(err.message || err);
  }
}

export const getRequestById = (id) => getRequests(`id=${id}`);

export const getFreeReqests = () => getRequests(`support_id=~`);

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
