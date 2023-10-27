import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import IRequest from './types/Request';
import { v4 } from 'uuid';

const Data = () => {
  const [titleRequest, setTitleRequest] = useState('');
  const [descriptionRequest, setDescriptionRequest] = useState('');
  const [typeRequest, setTypeRequest] = useState('incident');
  const [priorityRequest, setPriorityRequest] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {}, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastNumberTicket = await axios
      .get(
        `http://localhost:3000/tickets?_sort=ticket_number&_order=desc&_limit=1`
      )
      .then((res) => res.data[0].ticket_number);

    const request: IRequest = {
      id: v4(),
      ticket_number: lastNumberTicket + 1,
      title: titleRequest,
      description: descriptionRequest,
      created_at: new Date().toLocaleString('ru-RU').replace(',', ''),
      closed_at: '',
      type_request: typeRequest,
      user_id: 0,
      assigned_to: '',
      messages: [],
      priority: priorityRequest,
      completed: false,
    };

    await axios
      .post('http://localhost:3000/tickets', request)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response);
          setSuccessMessage('Заявка отправлена успешно!');
        } else {
          console.log(response.statusText);
        }
      });
  };

  return (
    <div>
      <hr />
      <div className="max-w-[500px] w-[100%] mx-auto mt-5 p-6 shadow-lg rounded bg-white">
        <h3 className="text-lg font-bold text-center">Подача заявки</h3>
        <form
          action=""
          onSubmit={(e: React.FormEvent) => onSubmit(e)}
          className="flex flex-col mt-5 gap-3"
        >
          <input
            type="text"
            placeholder="Тема"
            onChange={(e) => setTitleRequest(e.target.value)}
            required
            className="px-3 py-1 border-2 border-secondary rounded focus:outline-2 focus: outline-primary"
          />
          <textarea
            placeholder="Описание проблемы"
            onChange={(e) => setDescriptionRequest(e.target.value)}
            required
            className="px-3 py-1 border-2 border-secondary rounded focus:outline-2 focus: outline-primary min-h-[70px]"
          />
          <select
            name="type_request"
            id="type_request"
            onChange={(e) => setTypeRequest(e.target.value)}
            className="border border-secondary focus:outline focus:outline-primary"
          >
            <option selected value="incident">
              Инцидент
            </option>
            <option value="question">Вопрос</option>
          </select>
          <select
            name="priority"
            id="priority"
            onChange={(e) => setPriorityRequest(e.target.value)}
            className="border border-secondary focus:outline focus:outline-primary"
          >
            <option selected value="">
              Обычный
            </option>
            <option value="high">Высокий</option>
          </select>
          <input type="submit" value="Отпрвить" />
          <p className="text-green-500">{successMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default Data;
