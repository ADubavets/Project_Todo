// TodoFormModal.js
import React, { useState } from 'react';
import Modal from './Modal';
import { API_URL } from "./index.js";

const TodoFormModal = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          done: false,
          published_date: publishedDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Задача добавлена:', data);
        setTitle('');
        setDescription('');
        setPublishedDate('');
        handleClose();
      } else {
        console.error('Ошибка при добавлении задачи');
      }
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  return (
    <Modal show={show} handleClose={handleClose}>
      <h2>Добавить новую задачу</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Название задачи:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          Описание задачи:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Дата публикации:
          <input
            type="datetime-local"
            value={publishedDate}
            onChange={(e) => setPublishedDate(e.target.value)}
            required
          />
        </label>
        <button type="submit">Добавить</button>
      </form>
    </Modal>
  );
};

export default TodoFormModal;
