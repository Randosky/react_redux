import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
    async () => {
      // асинхронно получаем данные
      const response = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await response.json();

      // возвращаем данные во внешний мир
      return data;
    }
);

const todoSlice = createSlice({
    name: "todosSlice",
    initialState: {
        todos: [],
        status: null,
        error: null,
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
    extraReducers: {
        // выполняется когда идет загрузка данных
        [fetchTodos.pending]: (state, action) => {},
        // выполняется когда данные загрузились
        [fetchTodos.fulfilled]: (state, action) => {},
        // выполняется когда случилась ошибка
        [fetchTodos.rejected]: (state, action) => {},
    }
});

export const { addToDo, deleteToDo, changeComplited } = todoSlice.actions;

export default todoSlice.reducer;