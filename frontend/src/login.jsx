import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/auth/login/', {
        username,
        password,
      });
      
      const token = response.data.access_token; // Имя поля зависит от сервера
      localStorage.setItem('access_token', token); // Сохраняем токен
      onLoginSuccess(token); // Сообщаем родительскому компоненту, что логин успешен
    } catch (error) {
      setError('Ошибка аутентификации. Проверьте учетные данные.');
      console.error('Ошибка авторизации:', error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        placeholder="Имя пользователя"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Войти</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Login;
