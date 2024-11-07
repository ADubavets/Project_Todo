import React, { useState } from 'react';
import Todo from './Todo.jsx';

const TodoList = ({ todos, removeTodo, editTodo}) => {
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [filters, setFilters] = useState({
    description: '',
  });

  if (!todos.length) {
    return <h1 style={{ textAlign: 'center' }}>Дела не найдены</h1>;
  }

  if (!Array.isArray(todos)) {
    return <h1 style={{ textAlign: 'center' }}>Проверьте входящие данные</h1>;
  }

  // Функция для сортировки
  const handleSort = (field) => {
    const direction = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
  };

  // Сортировка данных
  const sortedTodos = [...todos].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Фильтрация данных
  const filteredTodos = sortedTodos.filter((todo) => {
    const descriptionMatch = todo.description.toLowerCase().includes(filters.description.toLowerCase());
    return descriptionMatch;
  });

  // Отображение иконки сортировки
  const renderSortIcon = (field) => {
    if (sortField !== field) return <i className="bi bi-arrow-down-up"></i>;
    return sortDirection === 'asc' ? <i className="bi bi-arrow-up"></i> : <i className="bi bi-arrow-down"></i>;
  };

  // Обработка изменения фильтра
  const handleFilterChange = (field, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  return (
    <div>
      {/* Поля для фильтрации */}
      <div style={{ width: '80%', margin: '10px auto', display: 'flex', justifyContent: 'space-between' }}>
        <input
          type="text"
          placeholder="Фильтр по описанию"
          value={filters.description}
          onChange={(e) => handleFilterChange('description', e.target.value)}
        />
      </div>

      {/* Таблица с данными */}
      <table className="table table-striped table-hover" style={{ width: '80%', margin: 'auto' }}>
        <thead>
          <tr>
            <th scope="colId">Номер</th>
            <th scope="colTitle" onClick={() => handleSort('title')}>Название {renderSortIcon('title')}</th>
            <th scope="colDescription">Описание</th>
            <th scope="colDate" onClick={() => handleSort('published_date')}>Дата {renderSortIcon('published_date')}</th>
            <th scope="colDone" onClick={() => handleSort('done')}>Статус {renderSortIcon('done')}</th>
            <th scope="colSetDone">Выполнено</th>
            <th scope="colSetNotDone">Отмена</th>
            <th scope="colDelete">Удалить</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((todo, index) => (
            <Todo todo={todo} key={todo.id} removeTodo={removeTodo} editTodo={editTodo} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
