import React from "react";
import TodoList from "./TodoList.jsx";


const Todo = (props) => {
    return (
        <div className="todo"> 
            <strong>{props.todo.results.id} Дело: {props.todo.results.title}</strong>
        </div>
    )
}

export default Todo;