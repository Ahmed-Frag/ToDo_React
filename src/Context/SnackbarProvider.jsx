import { createContext, useState } from "react";
export const TransitionsSnackbarContext = createContext(null);
export function SnackbarProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    message: "",
  });

  const handleClick = (mes) => {
    setState({
      ...state,
      open: true,
      message: mes,
    });
  };

  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  return (
    <>
      <TransitionsSnackbarContext.Provider
        value={{ handleClick, handleClose, state, setState }}
      >
        {children}
      </TransitionsSnackbarContext.Provider>
    </>
  );
}
