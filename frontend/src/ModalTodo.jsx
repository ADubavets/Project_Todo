// TodoFormModal.js
import React, { useState, useEffect } from 'react';
import { API_URL } from "./index.js";
import { Modal, Button, Form } from 'react-bootstrap';

const TodoFormModal = ({ show, handleClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    // Установить publishedDate на текущую дату при открытии модального окна
    if (show) {
      const currentDate = new Date();
      // Установка даты в формате 'YYYY-MM-DDTHH:mm'
      const formattedDate = currentDate.toISOString().slice(0, 16); 
      setPublishedDate(formattedDate);
    }
  }, [show]);

  useEffect(() => {
    // Проверка заполненности полей
    setIsFormValid(title.trim() !== '' && description.trim() !== '' && publishedDate !== '');
  }, [title, description, publishedDate]);

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

  if (!show) return null;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить новую задачу</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Название задачи</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название задачи"
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Описание задачи</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание задачи"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPublishedDate">
            <Form.Label>Дата публикации</Form.Label>
            <Form.Control
              type="datetime-local"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />
          </Form.Group>
          <p></p>
          <Button variant="primary" type="submit" disabled={!isFormValid}>
            Добавить
          </Button>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TodoFormModal;
