import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todosSlice",
    initialState: {
        todos: []
    },
    reducers: {
        addToDo(state, action) {
            state.todos.push({
                id: Date.now(),
                text: action.payload.text,
                complited: false,
            })
        },
        deleteToDo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
        },
        changeComplited(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
            toggledTodo.complited = !toggledTodo.complited;
        },
    },
});

export const { addToDo, deleteToDo, changeComplited } = todoSlice.actions;

export default todoSlice.reducer;