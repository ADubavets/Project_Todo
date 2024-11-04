import React from "react";


const Todo = (props) => {
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}.${month}.${year}`;
    };
      

    return (
        <tr>
            <td>{props.todo.id}</td>
            <td>{props.todo.title}</td>
            <td>{props.todo.description}</td>
            <td>{formatDate(props.todo.published_date)}</td>
            <td>{
                props.todo.done ? 
                <b><p style={{color: "red"}}>Да</p></b> :
                <b><p style={{color: "blue"}}>Нет</p></b>
                }
            </td>
            <td>
                <button type="button" className="btn btn-success" onClick={() => props.editTodo(props.todo, true)}>
                    Выполнено
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-warning" onClick={() => props.editTodo(props.todo, false)}>
                    Отмена
                </button>
            </td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => props.removeTodo(props.todo)}>
                    Удалить
                </button>
            </td>
            
        </tr>

    )
}

export default Todo;
