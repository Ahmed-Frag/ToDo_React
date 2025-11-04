import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Todo from "./Todo";
// BOTTON IMPORTS HERE //
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
// IMPORT CONTEXT
import React, { useContext, useEffect, useMemo } from "react";
// IMPORT MODEL SHOW
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// IMPORT OTHER
import TextField from "@mui/material/TextField";
import { useState } from "react";
import TransitionsSnackbar from "../Components/TransitionsSnackbar";
import { TransitionsSnackbarContext } from "../Context/SnackbarProvider";
import { useTodos } from "../Context/TodoListContext";
function Todolist() {
  // STATE --------------------------------------------
  const [AddField, setAddField] = useState("");
  const { Todos, dispatch } = useTodos();
  const { handleClick } = useContext(TransitionsSnackbarContext);
  const [filterType, setfilterType] = useState("All");
  const [open, setOpen] = useState(false);
  const [textFieldEdit, settextFieldEdit] = useState("");
  const [textFieldDetailsEdit, settextFieldDetailsEdit] = useState("");
  const [EditTodoId, setEditTodoId] = useState("");
  const [openDelet, setopenDelet] = useState(false);
  const [DeletTodoId, setDeletTodoId] = useState("");

  // HANDLE EVENTS -------------------------------------
  const handleAddClick = () => {
    dispatch({ type: "add", payload: { AddField } });
    setAddField("");
    handleClick("Add Succefully");
  };

  // EDIT DIALOGE SHOW
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditTodo = (todo) => {
    setOpen(true);
    settextFieldEdit(todo.Title);
    settextFieldDetailsEdit(todo.Details);
    setEditTodoId(todo.id);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textFieldEdit.trim() != "" && textFieldDetailsEdit.trim() != "") {
      dispatch({
        type: "edit",
        payload: {
          textFieldEdit,
          textFieldDetailsEdit,
          EditTodoId,
        },
      });
      setOpen(false);
      handleClick("Edit Succefully");
    }
  };
  //  DELET -----------
  const handleDeletTodoModle = (id) => {
    setopenDelet(true);
    setDeletTodoId(id);
  };

  const handleDeletTodo = () => {
    dispatch({ type: "Delet", payload: { id: DeletTodoId } });
    setopenDelet(false);
    handleClick("Deleted Succefully");
  };

  const handleDleteClose = () => {
    setopenDelet(false);
  };
  // FILTER SHOW --------------------------------------
  const todosToShow = useMemo(() => {
    return Todos.filter((todo) => {
      if (filterType === "All") {
        return true;
      } else if (filterType === "completed") {
        return todo.isCompleted;
      } else if (filterType === "notCompleted") return !todo.isCompleted;
    });
  }, [filterType, Todos]);

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);

  return (
    <>
      <Container maxWidth="xs">
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            {/* // TITLE HERE // */}
            <Typography
              variant="h3"
              className="text-center mb-2"
              component="div"
            >
              مهامي
              <Divider />
            </Typography>
            {/* === TITLE ==== */}

            {/* BOTTONS GROUB */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                variant="outlined"
                aria-label="Basic button group"
                dir="ltr"
                color="primary"
              >
                <Button
                  onClick={() => {
                    setfilterType("notCompleted");
                  }}
                  value={"notCompleted"}
                >
                  غير المنجز
                </Button>
                <Button
                  onClick={() => {
                    setfilterType("completed");
                  }}
                  value={"completed"}
                >
                  المنجز
                </Button>
                <Button
                  onClick={() => {
                    setfilterType("All");
                  }}
                  value={"All"}
                >
                  الكل
                </Button>
              </ButtonGroup>
            </Box>
            {/* ==== BOTTONS GROUB ==== */}

            {/* TODO CONTENT */}
            <Todo
              todosToShow={todosToShow}
              handleEditTodo={handleEditTodo}
              handleDeletTodoModle={handleDeletTodoModle}
            />
            {/* === TODO CONTENT === */}

            {/*  TODO ADD INPUT  */}
            <Box className="flex justify-start items-center ">
              <Box className="flex justify-between items-center w-3/5">
                <TextField
                  id="outlined-basic"
                  label="أضف مهمه"
                  variant="outlined"
                  value={AddField}
                  onChange={(e) => {
                    setAddField(e.target.value);
                  }}
                />
              </Box>

              <Box className="flex justify-between items-center w-2/5">
                <Button
                  variant="contained"
                  disabled={AddField == "" ? true : false}
                  size="large"
                  className="w-full h-13 !text-lg !m-1"
                  onClick={handleAddClick}
                >
                  إضافة
                </Button>
              </Box>
            </Box>
            {/* === TODO ADD INPUT === */}
          </CardContent>
        </Card>
      </Container>
      {/* SHOW MODLE EDIT */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              required
              margin="dense"
              id="name"
              value={textFieldEdit}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                settextFieldEdit(e.target.value);
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              value={textFieldDetailsEdit}
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => {
                settextFieldDetailsEdit(e.target.value);
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button type="submit" form="subscription-form">
            تعديل
          </Button>
        </DialogActions>
      </Dialog>
      {/* ============= SHOW MODLE EDIT ========== */}

      {/* SHOW MODLE DELET */}

      <Dialog
        open={openDelet}
        onClose={handleDleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">حذف المهمة </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد من الحذف ؟ لا يمكنك التراجع
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDleteClose}>تراجع</Button>
          <Button onClick={handleDeletTodo} autoFocus>
            نعم
          </Button>
        </DialogActions>
      </Dialog>
      {/*====================== SHOW MODLE DELET ================ */}
      {/* TRANSITIONSSNACKBAR TO SHOW */}
      <TransitionsSnackbar />
      {/* ---------------------------  TRANSITIONSSNACKBAR TO SHOW ------------------------------- */}
    </>
  );
}

export default React.memo(Todolist);
