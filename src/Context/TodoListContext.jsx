import { createContext, useContext, useReducer } from "react";
import { TodosReducer } from "../reducxs/TodosReducer";
export const TodoList = createContext([]);

function TodoListContextProvider({ children }) {
  const [Todos, dispatch] = useReducer(TodosReducer, []);
  return (
    <>
      <TodoList.Provider value={{ Todos, dispatch }}>
        {children}
      </TodoList.Provider>
    </>
  );
}
export const useTodos = () => {
  return useContext(TodoList);
};
export default TodoListContextProvider;
