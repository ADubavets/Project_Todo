import TodoList from './TodoList.jsx';
import {useState } from 'react';
import axios from 'axios';

const API_URL = '/todos/'

function App() {
  const [todos, setTodos] = useState([])
  async function getTodoc() {
    const response = await axios.get(API_URL)
    console.log(response.data)
    setTodos(response.data)
  }

  return (
    <div className="App">
      <button onClick={getTodoc}>Обновить список дел</button>
      <h1>Список наших дел</h1>
      <TodoList todos={todos}/>
    </div>
  )
}


export default App;
