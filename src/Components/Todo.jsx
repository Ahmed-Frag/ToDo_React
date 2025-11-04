import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

// IMPORT BOTTONS ICON
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
// IMPORT CONTEXT
import React, { useContext } from "react";
import { useTodos } from "../Context/TodoListContext";
import { TransitionsSnackbarContext } from "../Context/SnackbarProvider";
const Todo = React.memo(function Todo({
  todosToShow,
  handleEditTodo,
  handleDeletTodoModle,
}) {
  const { handleClick } = useContext(TransitionsSnackbarContext);
  const { Todos, dispatch } = useTodos();

  // HANDLE FUNCTION --------------------------------------
  // CHECK ---------
  const handleChecktTodo = (id) => {
    dispatch({ type: "toggle", payload: { id } });
    handleClick("Update Succefully");
  };

  // TODOS FOR SHOW
  const Todojsx = todosToShow.map((t) => (
    <Box key={t.id}>
      <Card sx={{ minWidth: 275 }} className="!bg-blue-900 !text-white my-2">
        <CardContent>
          <Box className="flex justify-start items-center ">
            {/* // TITLE && DETAILS HERE // */}
            <Typography
              variant="h4"
              className="text-center mb-2 w-3/5 text-start "
              component="div"
            >
              {t.Title}
              <Typography variant="h6">{t.Details}</Typography>
            </Typography>
            {/* === TITLE && DETAILS ==== */}

            {/* // CHECKBOX && EDIT && DELETE BUTTON HERE // */}
            <Box className="flex justify-between items-center w-2/5">
              <IconButton
                sx={{ padding: "0px" }}
                aria-label="Check"
                onClick={() => {
                  handleChecktTodo(t.id);
                }}
              >
                <DoneIcon
                  fontSize="large"
                  className=" border p-1  rounded-2xl"
                  style={{
                    background: t.isCompleted
                      ? "oklch(0.63 0.16 164.93)"
                      : "white",
                    color: t.isCompleted ? "white" : "oklch(0.63 0.16 164.93)",
                    border: t.isCompleted ? "white" : "oklch(0.63 0.16 164.93)",
                  }}
                />
              </IconButton>

              <IconButton
                sx={{ padding: "0px" }}
                aria-label="Edit"
                onClick={() => {
                  handleEditTodo(t);
                }}
              >
                <EditIcon
                  fontSize="large"
                  className="bg-white border p-1 border-b-yellow-700 rounded-2xl text-yellow-700"
                />
              </IconButton>

              <IconButton
                sx={{ padding: "0px" }}
                aria-label="Delete"
                onClick={() => {
                  handleDeletTodoModle(t.id);
                }}
              >
                <DeleteIcon
                  fontSize="large"
                  className="bg-white border p-1 border-b-red-700 rounded-2xl text-red-700"
                />
              </IconButton>
            </Box>
          </Box>
          {/* === CHECKBOX && eDIT && DELETE BUTTON ==== */}
        </CardContent>
      </Card>
    </Box>
  ));

  return (
    <>
      {/* SHOW TODO */}
      {Todojsx}
      {/* === SHOW TODO ===*/}
    </>
  );
});

export default Todo;
