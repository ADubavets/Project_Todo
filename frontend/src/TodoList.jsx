import React from 'react';
import Todo from './Todo.jsx'

const TodoList = ({todos}) => {
    

    return (
        <div>
            {todos.map(todo => <Todo todo ={todo} key={todo.results.id}/>)}
        </div>
    );
};

export default TodoList;