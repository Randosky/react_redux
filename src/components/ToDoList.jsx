import React from 'react'
import ToDoItem from './ToDoItem'
import { useSelector } from 'react-redux';

const ToDoList = () => {
    //Доступ к переменной из хранилища
    const todos = useSelector(state => state.todosState.todos)

    return (
        <ul className="todo__list">
            {
                todos.map(todo => {
                    return (
                        <ToDoItem {...todo} key={todo.id} />
                    )
                })
            }
        </ul>
    )
}

export default ToDoList