import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

const Data = () => {
  const [titleRequest, setTitleRequest] = useState('');
  const [descriptionRequest, setDescriptionRequest] = useState('');
  const [typeRequest, setTypeRequest] = useState('incident');
  const [priorityRequest, setPriorityRequest] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {}, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lastId = await axios
      .get('http://localhost:3000/requests?_sort=id&_order=desc&_limit=1')
      .then((res) => res.data[0].id);

    const request = {
      id: lastId + 1,
      title: titleRequest,
      description: descriptionRequest,
      applicant: '',
      create_date: new Date().toLocaleString('ru-RU').replace(',', ''),
      completed_date: '',
      type_request: typeRequest,
      userId: 0,
      priority: priorityRequest,
      completed: false,
    };

      await axios.post("http://localhost:3000/requests", request).then(function(response) {
        if(response.status === 200){
          console.log(response);
          setSuccessMessage("Заявка отправлена успешно!")
        } else{
          console.log(response.statusText)
        }
      })
      
  };

  return (
    <div>
      <h3 className="dark:text-red-200 dark:bg-gray-200">Data</h3>
      <Link to="/">App</Link>
      <hr />
      <div>
        <h3>Подача заявки</h3>
        <form action="" onSubmit={(e: React.FormEvent) => onSubmit(e)} className="flex flex-col">
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
          <p className="text-green-500">{successMessage}</p>
        </form>
      </div>
    </div>
  );
};

export default Data;
