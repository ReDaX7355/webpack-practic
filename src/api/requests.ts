import axios from 'axios';

export const SERVER_URL: string = 'https://localhost:3000';

async function getTickets(query: string, endpoint = SERVER_URL) {
  try {
    // Определяем наличие строки запроса
    query ? (query = `?${query}`) : (query = '');

    const response = await axios.get(`${endpoint}/tickets${query}`);

    if (response.status != 200) throw new Error(response.statusText);

    return response.data;
  } catch (err) {
    console.error(err.message || err);
  }
}

export const getAllTickets = () => getTickets('');

export const getTicketsByPage = (page: number) =>
  getTickets(`_page=${page}&_limit=10`);

export const getTicketById = (id: string | number) => getTickets(`id=${id}`);

export const getTicketsByKey = (key: string, value: string) =>
  getTickets(`${key}=${value}`);

export const searchTickets = async (value: string | number) => {
  if (value) {
    return getTickets(`q=${value}`);
  } else {
    return getAllTickets();
  }
};
