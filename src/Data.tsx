import React, { useEffect, useState } from 'react';
import { getRequestsByKey } from './api/requests';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Data = () => {
  const [titleRequest, setTitleRequest] = useState('');
  const [descriptionRequest, setDescriptionRequest] = useState('');
  const [typeRequest, setTypeRequest] = useState('incident');
  const [priorityRequest, setPriorityRequest] = useState('');

  useEffect(() => {}, []);

  const onSubmit = (e: Event) => {
    e.preventDefault();

    let request;

    axios
      .get('http://localhost:3000/requests?_sort=id&_order=desc&_limit=1')
      .then((res) => 

      request = {
        id: res.data[0].id + 1,
        title: titleRequest,
        description: descriptionRequest,
        applicant: "",
        create_date: new Date().toLocaleString('ru-RU').replace(',', ''),
        completed_date: '',
        type_request: typeRequest,
        userId: 0,
        priority: priorityRequest,
        completed: false,
    }).then(res => axios.post("http://localhost:3000/requests", res));



    console.log(request);

    // axios.post("http://localhost:3000/requests", request)
  };

  return (
    <div>
      <h3 className="dark:text-red-200 dark:bg-gray-200">Data</h3>
      <Link to="/">App</Link>
      <hr />
      <div>
        <h3>Подача заявки</h3>
        <form action="" onSubmit={(e) => onSubmit(e)} className="flex flex-col">
          <input
            type="text"
            placeholder="Тема"
            onChange={(e) => setTitleRequest(e.target.value)}
          />
          <input
            type="text"
            placeholder="Описание проблемы"
            onChange={(e) => setDescriptionRequest(e.target.value)}
          />
          <select
            name="type_request"
            id="type_request"
            onChange={(e) => setTypeRequest(e.target.value)}
          >
            <option value="incident">Инцидент</option>
            <option value="question">Вопрос</option>
          </select>
          <select
            name="priority"
            id="priority"
            onChange={(e) => setPriorityRequest(e.target.value)}
          >
            <option value="">Обычный</option>
            <option value="high">Высокий</option>
          </select>
          <input type="submit" value="Отпрвить" />
        </form>
      </div>
    </div>
  );
};

export default Data;
