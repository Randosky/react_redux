import React from 'react'
import { changeComplited, deleteToDo } from '../store/todoSlice'
import { useDispatch } from 'react-redux'

const ToDoItem = ({id, text, complited}) => {

    const dispatch = useDispatch()
    const change = () => dispatch(changeComplited({id}))
    const del = () => dispatch(deleteToDo({id}))
 
    return (
        <li key={id} className="todo__item">
            <input type="checkbox" className="item__check" checked={complited} onChange={change} />
            <span className="item__text">{text}</span>
            <span className="item__delete" onClick={del}>&times;</span>
        </li>
    )
}

export default ToDoItem