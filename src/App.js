import { useState } from "react";
import InputField from "./components/InputField";
import ToDoList from "./components/ToDoList";
import { useDispatch } from 'react-redux';
import { addToDo } from "./store/todoSlice"
import './style/App.css'

function App() {
  const [text, setText] = useState("");
  // Получить доступ к функции из хранилища
  const dispatch = useDispatch()

  const addTask = () => {
    dispatch(addToDo({ text }))
    setText('');
  };

  return (
    <div className="App">
      <InputField text={text} handleInput={setText} handleSubmit={addTask} title="Add ToDo" />
      <ToDoList />
    </div>
  );
}

export default App;
