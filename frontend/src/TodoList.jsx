import React from 'react';
import Todo from './Todo.jsx'

const TodoList = ({todos, removeTodo, editTodo}) => {
    if (!TodoList.length) {
        return (
            <h1 style={{textAlign: "center"}}> Дела не найдены </h1>
        )
    }

    if (!Array.isArray(todos)) {
        return (
            <h1 style={{textAlign: "center"}}> Проверьте входящие данные </h1>
        )
    }

    return (
        <div>
            
            <table className="table table-striped table-hover" style={{width: "80%", margin: "auto"}}>
                <thead>
                    <tr>
                        <th scope="colId">Номер</th>
                        <th scope="colTitle">Название</th>
                        <th scope="colDescription">Описание</th>
                        <th scope="colDate">Дата</th>
                        <th scope="colDone">Статус</th>
                        <th scope="colDelete">Удалить</th>
                        <th scope="colSetDone">Выполнено</th>
                        <th scope="colSetNotDone">Отмена</th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map(todo => <Todo todo ={todo} key={todo.id} removeTodo={removeTodo} editTodo={editTodo}/>)}
                </tbody>
            </table>
        </div>
    );
};

export default TodoList;