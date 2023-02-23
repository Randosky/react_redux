import {useState, useEffect} from "react";
import InputField from "./components/InputField";
import ToDoList from "./components/ToDoList";
import {useDispatch, useSelector} from 'react-redux';
import {addNewTodo, fetchTodos} from "./store/todoSlice"
import './style/App.css'

function App() {
    const [title, setTitle] = useState("");
    // Получить доступ к функции из хранилища
    const dispatch = useDispatch()
    // обращается к todos в index.js
    const {status, error} = useSelector(state => state.todosState)

    const addTask = () => {
        dispatch(addNewTodo(title));
        setTitle('');
    };

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    return (
        <div className="App">
            <InputField text={title} handleInput={setTitle} handleSubmit={addTask} title="Add ToDo"/>

            {status === "loading" && <h2>Loading...</h2>}
            {error && <h2>An error occerd: {error}</h2>}

            <ToDoList/>
        </div>
    );
}

export default App;
