import Snackbar from "@mui/material/Snackbar";
import { useContext } from "react";
import { TransitionsSnackbarContext } from "../Context/SnackbarProvider";

export default function TransitionsSnackbar() {
  const { handleClose, state } = useContext(TransitionsSnackbarContext);
  return (
    <div>
      <Snackbar
        open={state.open}
        onClose={handleClose}
        message={state.message}
        autoHideDuration={1200}
        severity="success"
        variant="filled"
      />
    </div>
  );
}
