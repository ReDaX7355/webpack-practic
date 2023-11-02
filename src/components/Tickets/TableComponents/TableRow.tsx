import React, { FC } from 'react';
import ITicket from '../../../types/ITicket';
import { useNavigate } from 'react-router-dom';

interface TableRowProps {
  ticket: ITicket;
}

const TableRow: FC<TableRowProps> = ({ ticket }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/ticket/${ticket.ticket_number}`);
  };

  return (
    <tr onClick={() => handleClick()}>
      <td>{ticket.ticket_number}</td>
      <td>{ticket.title}</td>
      <td>{ticket.created_at}</td>
      <td>{ticket.type_request == 'question' ? 'Вопрос' : 'Инцидент'}</td>
      <td>
        {ticket.priority == '' ? (
          'Обычный'
        ) : (
          <span className="text-red-600">Высокий</span>
        )}
      </td>
      <td>{ticket.completed ? 'Закрыта' : 'Открыта'}</td>
    </tr>
  );
};

export default TableRow;
