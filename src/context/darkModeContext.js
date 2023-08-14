import DarkModeReducer from "./darkModeReducer";
import { createContext, useReducer } from "react";

const INITIAL_STATE = {
  darkMode: false,
};

// RMB to import following
// import { DarkModeContext } from "../../context/darkModeContext";
export const DarkModeContext = createContext(INITIAL_STATE);

export const DarkModeContextProvider = ({ children }) => {
  const [state, dispatchDarkMode] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider
      value={{ darkMode: state.darkMode, dispatchDarkMode }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
