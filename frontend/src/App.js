import TodoList from './TodoList.jsx';
import { useState } from 'react';
import axios from 'axios';
import TodoFormModal from './ModalTodo.jsx';
import { API_URL } from "./index.js";

const Header = () => {

  return (
    <div className="text-center">

      <h1 style={{ textAlign: "center", top: "100px" }}>Список наших дел</h1>
    </div>)
}

function App() {
  const [todos, setTodos] = useState([])

  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  async function getTodos() {
    const response = await axios.get(API_URL)
    console.log(response.data)
    setTodos(response.data)
  }

  const removeTodo = (todo) => {
    setTodos(todos.filter(t => t.id !== todo.id))
    axios.delete(API_URL + todo.id.toString() + '/')
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  const editTodo = (todo, done) => {
    const updatedTodo = { ...todo, done };
    const allWithoutMentioned = todos.filter(t => t.id !== todo.id);

    setTodos([...allWithoutMentioned, updatedTodo].sort((todo1, todo2) => todo1.id - todo2.id));

    axios.put(API_URL + todo.id.toString() + '/', updatedTodo)
      .then((response) => {
        // handle success
        console.log(response);
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  return (
    <div className="App">

      <header >
        <p></p>
        <Header />
        <p></p>
      </header>

      <main>
        <TodoList todos={todos} removeTodo={removeTodo} editTodo={editTodo} />
      </main>
      
      <footer style={{ textAlign: "center", bottom: "50px" }}>
        <button type="button" class="btn btn-primary" onClick={getTodos}>
          <i className="bi bi-cloud-upload-fill"></i> Обновить список дел</button>
        <button type="button" class="btn btn-primary" style={{ margin: "50px", }} onClick={handleShowModal}>
          <i className="bi bi-database-add"></i> Добавить дело
        </button>

        {/* Модальное окно для добавления задачи */}
        <TodoFormModal show={showModal} handleClose={handleCloseModal} />

        {/* Здесь могут быть другие компоненты, например, список задач */}
      </footer>


    </div>
  )
}


export default App;
