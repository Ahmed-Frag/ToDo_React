import Box from "@mui/material/Box";
import Todolist from "./Components/Todolist";
import { SnackbarProvider } from "./Context/SnackbarProvider";
import TodoListContextProvider from "./Context/TodoListContext";
function App() {
  return (
    <SnackbarProvider>
      <TodoListContextProvider>
        <Box className="flex justify-center items-center h-screen">
          <Todolist />
        </Box>
      </TodoListContextProvider>
    </SnackbarProvider>
  );
}

export default App;
