import React from 'react'
import {toggleStatus, removeTodo} from '../store/todoSlice'
import {useDispatch} from 'react-redux'

const ToDoItem = ({id, title, completed}) => {

    const dispatch = useDispatch()
    const change = () => dispatch(toggleStatus(id))

    return (
        <li key={id} className="todo__item">
            <input type="checkbox" className="item__check" checked={completed} onChange={change}/>
            <span className="item__text">{title}</span>
            <span className="item__delete" onClick={() => dispatch(removeTodo(id))}>&times;</span>
        </li>
    )
}

export default ToDoItem