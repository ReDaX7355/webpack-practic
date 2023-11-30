import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicketsByKey } from './api/requests';
import ITicket from './types/ITicket';
import Messages from './components/Messages';
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
    <div className="container mx-auto bg-white md:h-[700px] rounded p-7">
      <div className="flex md:flex-row flex-col md:gap-0 gap-20">
        <div className="grow md:border-b-2 md:border-gray-100 border-none">
          <h1 className="text-2xl font-bold">Данные заявки</h1>
          <div className="mt-10">
            <ul className="flex flex-col gap-4">
              <li className="text-primary">
                <p className="text-sm">Номер заявки: </p>
                <p className="font-medium">{ticket.ticket_number}</p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Тема: </p>
                <p className="font-medium">{ticket.title}</p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Создана: </p>
                <p className="font-medium">{ticket.created_at}</p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Заявитель: </p>
                <p className="font-medium">{ticket.applicant_name}</p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Тип заявки: </p>
                <p className="font-medium">
                  {ticket.type_request === 'incident' ? 'Инцидент' : 'Вопрос'}
                </p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Приоритет: </p>
                <p className="font-medium">
                  {ticket.priority === '' ? 'Обычный' : 'Высокий'}
                </p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Исполнитель: </p>
                <p className="font-medium">
                  {ticket.assigned_to ? ticket.assigned_to : 'Не назначен'}
                </p>
              </li>
              <li>
                <p className="text-gray-500 text-sm">Статус заявки: </p>
                <p className="font-medium">
                  {ticket.completed
                    ? 'Закрыта'
                    : ticket.assigned_to
                    ? 'В работе'
                    : 'Открыта'}
                </p>
              </li>
              {ticket.closed_at && (
                <li>
                  <p className="text-gray-500 text-sm">Дата закрытия: </p>
                  <p className="font-medium">{ticket.closed_at}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="grow">
          <h1 className="text-2xl font-bold">Переписка</h1>
          <Messages messages={ticket.messages} />
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
