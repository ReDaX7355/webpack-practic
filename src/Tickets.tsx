import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';

const Tickets:FC = () => {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3000/requests').then(
      (res) => {
        
        setTickets(res.data)
      }
    ).catch((err) => console.log(err))

  }, [])


  return (
    <div>
      <h3>Tickets</h3>

      <table>
        <thead>
          <tr>
            <th>Номер заявки</th>
            <th>Тема</th>
            <th>Дата создания</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
        {tickets && 
          tickets.map(ticket => 
            <tr>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>{ticket.created_at}</td>
              <td>{ticket.completed ? "Закрыта": "Открыта"}</td>
            </tr>
          )
        }
        </tbody>
        
      </table>
    </div>
  );
};

export default Tickets;
