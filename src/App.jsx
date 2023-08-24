import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Restore from "./pages/restore/Restore";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Edit from "./pages/edit/Edit";
import ChangePassword from "./pages/password/ChangePassword";
import OTP from "./pages/otp/OTP";
import UploadFile from "./pages/uploadfile/UploadFile";
import UpdateFile from "./pages/updatefiles/UpdateFile";
import SystemHealth from "./pages/systemhealth/SystemHealth";

import "./style/dark.scss";

import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// const userInputs = [
//   // Changed id to its actual name w/ adoption of firebase
//   {
//     id: "displayName",
//     label: "Name",
//     type: "text",
//     placeholder: "John Doe",
//   },
//   {
//     id: "username",
//     label: "Username",
//     type: "text",
//     placeholder: "john_doe",
//   },
//   {
//     id: "email",
//     label: "Email",
//     type: "mail",
//     placeholder: "john_doe@gmail.com",
//   },
//   {
//     id: "date",
//     lable: "Registered Date",
//     type: "date",
//     placeholder: "10 July 2023",
//   },
//   {
//     id: "phone",
//     label: "Phone",
//     type: "text",
//     placeholder: "+1 234 567 89",
//   },
//   {
//     id: "password",
//     label: "Password",
//     type: "password",
//   },
// ];

function App() {
  const { darkMode } = useContext(DarkModeContext);

  // How to protect our route
  // const currentUser = false;
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser);

  // Allow to go to homepage only when there is a current user
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    // <div className="App">
    // Creating state for dark is not a good idea as setDark should be passed to every components -> context API
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="restore" element={<Restore />} />
            <Route path="otp" element={<OTP />} />
            {/* 
            1. Determines if the route is an index route. Index routes render into their parent's Outlet at their parent's URL (like a default child route). 
            2. Whenever we go to homepage and if thereâ€™s no current user, website directs to login page
            */}
            <Route index element={<Landing />} />
            <Route
              path="home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List type="users" />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
              {/* <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="Add New User" />
                  </RequireAuth>
                }
              /> */}
              <Route
                path="edit"
                element={
                  <RequireAuth>
                    {/* <Edit inputs={userInputs} title="Edit Account" /> */}
                    <Edit />
                  </RequireAuth>
                }
              />
              <Route
                path="change-password"
                element={
                  <RequireAuth>
                    <ChangePassword />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="files">
              <Route
                index
                element={
                  <RequireAuth>
                    <List type="files" />
                  </RequireAuth>
                }
              />
              <Route
                path="shared"
                element={
                  <RequireAuth>
                    <List type="shared" />
                  </RequireAuth>
                }
              />              
              <Route
                path="sharing"
                element={
                  <RequireAuth>
                    <List type="sharing" />
                  </RequireAuth>
                }
              />
              <Route
                path="trash"
                element={
                  <RequireAuth>
                    <List type="trash" />
                  </RequireAuth>
                }
              />
              <Route
                path="upload"
                element={
                  <RequireAuth>
                    <UploadFile />
                  </RequireAuth>
                }
              />
              <Route
                path="update"
                element={
                  <RequireAuth>
                    <UpdateFile />
                  </RequireAuth>
                }
              />
              {/* <Route
                path=":fileId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              /> */}
              {/* <Route
                  path="new"
                  element={
                    <RequireAuth>
                      <NewFile title="Add New File" />
                    </RequireAuth>
                  }
                /> */}
            </Route>
            <Route
              path="systemhealth"
              element={
                <RequireAuth>
                  <SystemHealth />
                </RequireAuth>
              }
            />
            <Route
              path="enquiries"
              element={
                <RequireAuth>
                  <List type="enquiries" />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
