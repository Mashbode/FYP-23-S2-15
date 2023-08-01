import Landing from "./pages/landing/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Restore from "./pages/restore/Restore";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import Edit from "./pages/edit/Edit";
import OTP from "./pages/otp/OTP";
import MyDrive from "./pages/mydrive/MyDrive";

import "./style/dark.scss";

import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";

import { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const userInputs = [
  // Changed id to its actual name w/ adoption of firebase
  {
    id: "username",
    label: "Username",
    type: "text",
    placeholder: "john_doe",
  },
  {
    id: "displayName",
    label: "Name and surname",
    type: "text",
    placeholder: "John Doe",
  },
  {
    id: "email",
    label: "Email",
    type: "mail",
    placeholder: "john_doe@gmail.com",
  },
  {
    id: "phone",
    label: "Phone",
    type: "text",
    placeholder: "+1 234 567 89",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Elton St. 216 NewYork",
  },
  {
    id: "country",
    label: "Country",
    type: "text",
    placeholder: "USA",
  },
];

// const productInputs = [
//   {
//     id: 1,
//     label: "Title",
//     type: "text",
//     placeholder: "Apple Macbook Pro",
//   },
//   {
//     id: 2,
//     label: "Description",
//     type: "text",
//     placeholder: "Description",
//   },
//   {
//     id: 3,
//     label: "Category",
//     type: "text",
//     placeholder: "Computers",
//   },
//   {
//     id: 4,
//     label: "Price",
//     type: "text",
//     placeholder: "100",
//   },
//   {
//     id: 5,
//     label: "Stock",
//     type: "text",
//     placeholder: "in stock",
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
            2. Whenever we go to homepage and if there’s no current user, website directs to login page
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
                    <Edit inputs={userInputs} title="Edit Account" />
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
                path=":fileId"
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
                    <NewFile title="Add New File" />
                  </RequireAuth>
                }
              /> */}
            </Route>
            <Route path="files-shared">
              <Route
                index
                element={
                  <RequireAuth>
                    <List type="shared" />
                  </RequireAuth>
                }
              />
              <Route
                path=":fileId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="files-deleted">
              <Route
                index
                element={
                  <RequireAuth>
                    <List type="trash" />
                  </RequireAuth>
                }
              />
              <Route
                path=":fileId"
                element={
                  <RequireAuth>
                    <Single />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="enquiries">
              <Route
                index
                element={
                  <RequireAuth>
                    <List type="enquiries" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route
              path="my-drive"
              element={
                <RequireAuth>
                  <MyDrive />
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
