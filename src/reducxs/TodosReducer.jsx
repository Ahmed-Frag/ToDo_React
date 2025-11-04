import { nanoid } from "nanoid";

export function TodosReducer(curntTodos, action) {
  switch (action.type) {
    case "add": {
      if (action.payload.AddField.trim() != "") {
        const updateTodos = [
          ...curntTodos,
          {
            id: nanoid(),
            Title: action.payload.AddField,
            Details: "التفاصيل",
            isCompleted: false,
          },
        ];
        localStorage.setItem("Todos", JSON.stringify(updateTodos));
        return updateTodos;
      }
      return curntTodos;
    }
    case "Delet": {
      const NewTodos = curntTodos.filter((t) => {
        return t.id != action.payload.id;
      });
      localStorage.setItem("Todos", JSON.stringify(NewTodos));
      return NewTodos;
    }
    case "edit": {
      const NewTodos = curntTodos.map((t) => {
        if (action.payload.EditTodoId === t.id) {
          return {
            ...t,
            Title: action.payload.textFieldEdit,
            Details: action.payload.textFieldDetailsEdit,
          };
        } else {
          return t;
        }
      });
      localStorage.setItem("Todos", JSON.stringify(NewTodos));
      return NewTodos;
    }
    case "toggle": {
      const NewTodos = curntTodos.map((t) => {
        if (action.payload.id === t.id) {
          return { ...t, isCompleted: !t.isCompleted };
        } else {
          return t;
        }
      });
      localStorage.setItem("Todos", JSON.stringify(NewTodos));
      return NewTodos;
    }
    case "get": {
      const storedTodos = JSON.parse(localStorage.getItem("Todos")) || [];
      return storedTodos;
    }
    default: {
      throw Error("unknown Action" + action.type);
    }
  }
}
