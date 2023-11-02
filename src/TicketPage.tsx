import React from 'react';
import { useParams } from 'react-router-dom';

const TicketPage = () => {
  const { ticket_number } = useParams();

  return (
    <div className="container mx-auto">
      <p>Заявка номер: {ticket_number}</p>
    </div>
  );
};

export default TicketPage;
