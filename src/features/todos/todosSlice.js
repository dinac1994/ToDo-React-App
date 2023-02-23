import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos:
    localStorage.getItem("todos") === null
      ? []
      : JSON.parse(localStorage.getItem("todos")),
};

const updateLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [
        ...state.todos,
        { task: action.payload, complete: false, id: Date.now() },
      ];
      updateLocalStorage(state.todos);
    },
    completeTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload ? { ...todo, complete: !todo.complete } : todo;
      });
      updateLocalStorage(state.todos);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      updateLocalStorage(state.todos);
    },
    clearAll: (state) => {
      state.todos = [];
      updateLocalStorage(state.todos);
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter((item) => item.complete === false);
      updateLocalStorage(state.todos);
    },
  },
});

export const { addTodo, completeTodo, deleteTodo, clearAll, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
