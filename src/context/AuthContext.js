import AuthReducer from "./AuthReducer";
import { createContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  // currentUser: null, // This makes everytime we refresh, the currentUser becomes null
  currentUser: JSON.parse(localStorage.getItem("user")) || null, // Get the user info from browser local storage, if it does not exist, set as null
};

// RMB to import following
// import { AuthContext } from "../../context/AuthContext";
export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
