import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketsByKey } from './api/requests';
import ITicket from './types/ITicket';
const TicketPage: FC = () => {
  const [ticket, setTicket] = useState<ITicket | []>([]);

  let { ticket_number } = useParams();
  
  useEffect(() => {
    localStorage.setItem('currentTicketId', ticket_number || '');
    getTicketsByKey('ticket_number', ticket_number).then((res) => {
      if (res) {
        setTicket(res[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (!ticket_number) {
      getTicketsByKey(
        'ticket_number',
        localStorage.getItem('currentTicketId') ?? ''
      ).then((res) => {
        if (res) {
          setTicket(res[0]);
        }
      });
    }
  }, []);

  return (
    <div className="container mx-auto">
      <p className="text-xl text-bold">Заявка номер: {ticket.ticket_number}</p>
      <div>
        <span>{ticket.created_at}</span>
      </div>
    </div>
  );
};

export default TicketPage;
