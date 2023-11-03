import React, { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
const TicketPage: FC = () => {
  const { ticket_number } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!ticket_number) {
      localStorage.setItem('currentTicketId', ticket_number || '');
      navigate('/tickets');
    }

    return () => {
      localStorage.removeItem('currentTicketId');
    };
  }, []);

  return (
    <div className="container mx-auto">
      <p>Заявка номер: {ticket_number}</p>
    </div>
  );
};

export default TicketPage;
