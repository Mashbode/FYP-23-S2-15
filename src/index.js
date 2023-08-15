import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { AuthContextProvider } from "./context/AuthContext";

// ERROR: React Hook "useReducer" cannot be called at the top level. React Hooks must be called in a React function component or a custom React Hook function
// import DarkModeReducer from "./darkModeReducer";
// import { createContext, useReducer } from "react";

// const [state, dispatch] = useReducer(DarkModeReducer, {
//   darkMode: false,
// });

// const DarkModeContext = createContext({
//   darkMode: false,
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <DarkModeContext.Provider value={{ darkMode: state.darkMode, dispatch }}>
      <App />
    </DarkModeContext.Provider> */}
    <DarkModeContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </DarkModeContextProvider>
  </React.StrictMode>
);
