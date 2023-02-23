import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    "todos/fetchTodos",
    // async принимает два параметра,
    // где первый - то, что мы передаем в момент вызова через dispatch
    // а второй - доп. штуки, которые используются внутри этой функции
    async (_, {rejectWithValue}) => {
        try {
            // асинхронно получаем данные
            const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10");

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            const data = await response.json();

            // возвращаем данные во внешний мир
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const removeTodo = createAsyncThunk(
    "todos/removeTodo",
    async (id, {rejectWithValue, dispatch}) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });

            console.log(response);

            if (!response.ok) {
                throw new Error('Can`t delete todo. Server error');
            }

            dispatch(deleteToDo({id}));
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const toggleStatus = createAsyncThunk(
    "todos/toggleStatus",
    async (id, {rejectWithValue, dispatch, getState}) => {
        const todo = getState().todosState.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    completed: !todo.completed,
                })
            });

            if (!response.ok) {
                throw new Error('Can`t change status. Server error');
            }

            const data = await response.json();
            console.log(data);

            dispatch(changeCompleted({id}))
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
);

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async (title, {rejectWithValue, dispatch}) => {
        try {
            const todo = {
                title: title,
                userId: 1,
                completed: false
            };

            const response = await fetch(`https://jsonplaceholder.typicode.com/todos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({todo})
            });

            if (!response.ok) {
                throw new Error('Can`t add task. Server error');
            }

            const data = await response.json();
            console.log(data)

            dispatch(addToDo(data))
        } catch (e) {
            return rejectWithValue(e.message);
        }
    }
)

const setError = (state, action) => {
    state.status = "rejected";
    state.error = action.payload;
};

const todoSlice = createSlice({
    name: "todosSlice",
    initialState: {
        todos: [],
        status: null,
        error: null,
    },
    reducers: {
        addToDo(state, action) {
            state.todos.push(action.payload);
        },
        deleteToDo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
        },
        changeCompleted(state, action) {
            const toggledTodo = state.todos.find(todo => todo.id === action.payload.id);
            toggledTodo.completed = !toggledTodo.completed;
        },
    },
    extraReducers: {
        // выполняется когда идет загрузка данных
        [fetchTodos.pending]: (state) => {
            state.status = "loading";
            state.error = null;
        },
        // выполняется когда данные загрузились
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = "resolved";
            state.todos = action.payload;
        },
        // выполняется когда случилась ошибка
        [fetchTodos.rejected]: setError,
        [removeTodo.rejected]: setError,
        [toggleStatus.rejected]: setError,
    }
});

export const {addToDo, deleteToDo, changeCompleted} = todoSlice.actions;

export default todoSlice.reducer;