import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';

function ApiRequestPage() {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [response, setResponse] = useState('');
  const [headersJSON, setHeadersJSON] = useState('');

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handleHeadersChange = (event) => {
    setHeadersJSON(event.target.value);
  };
  const requestOptions = {
    method: 'GET', // Укажите ваш метод
    mode: 'no-cors', 
  };
  const handleSendRequest = async () => {
    const fetchResponse = fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text(); // Получение текстового ответа
    })
    .then(text => {
      // text содержит текстовый ответ
      console.log(text);
    })
  
    const responseData = await fetchResponse;
    console.log(responseData)
    if (fetchResponse.ok) {
      setResponse(responseData);
    } else {
      setResponse('Произошла ошибка при отправке запроса.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Отправка запросов</h1>

      {/* Форма для ввода JSON-хедеров */}
      <div className="form-group">
        <h2>Хедеры (в формате JSON):</h2>
        <textarea
          id="headersJSON"
          className="form-control"
          rows="4"
          value={headersJSON}
          onChange={handleHeadersChange}
        />
      </div>

      {/* Форма для отправки запроса */}
      <div className="form-group">
        <label htmlFor="url">URL:</label>
        <input
          type="text"
          id="url"
          className="form-control"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="method">Метод:</label>
        <select
          id="method"
          className="form-control"
          value={method}
          onChange={handleMethodChange}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
        </select>
      </div>
      <div className="form-group">
        <button className="btn btn-primary" onClick={handleSendRequest}>
          Отправить запрос
        </button>
      </div>

      {/* Ответ на запрос */}
      <div className="form-group" style={{ height: '50vh' }}>
        <h2>Ответ:</h2>
        <SyntaxHighlighter language="html" style={xonokai}>
          {response}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

export default ApiRequestPage;
