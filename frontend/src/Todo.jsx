import React from "react";
import TodoList from "./TodoList.jsx";


const Todo = (props) => {
    return (
        <div className="todo"> 
            <strong>{props.todo.id} Дело: {props.todo.title}</strong>
        </div>
    )
}

export default Todo;