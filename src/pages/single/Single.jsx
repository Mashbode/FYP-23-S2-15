import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/chart/Chart";
// import List from "../../components/table/Table";
import Pie from "../../components/chart/pie/Pie";
import FileManager from "../../components/filemananger/FileManager";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";

const Single = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user")); // Getting a user from local storage

  const { dispatch } = useContext(AuthContext);

  const handleDeleteUser = () => {
    // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
    deleteUser(auth.currentUser)
      .then(() => {
        // User deleted.
        // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
        deleteDoc(doc(db, "users", user.uid));
        toast.success("Your account deleted successfully!");
        setTimeout(() => {
          dispatch({ type: "LOGOUT" });
        }, 2000);
      })
      .catch((error) => {
        // An error ocurred
        toast.error(`Contact admin: ${error.code}`);
      });
  };

  // https://firebase.google.com/docs/reference/node/firebase.auth.EmailAuthProvider#static-credential
  // https://stackoverflow.com/questions/39872885/using-firebase-reauthenticate
  const handleDeleteAccount = () => {
    const credential = EmailAuthProvider.credential(user.email, password);
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // User re-authenticated.
        handleDeleteUser();
      })
      .catch((error) => {
        // An error ocurred
        switch (error.code) {
          case "auth/wrong-password":
            toast.error("Provided password is wrong!");
            break;
          default: // All the other errors
            toast.error(`Contact admin: ${error.code}`);
            setTimeout(() => {
              // Refresh after the toast message
              window.location.reload();
            }, 2000);
            break;
        }
      });
  };

  const handleStorageIncrease = () => {};
  const handleStorageDecrease = () => {};

  return (
    <div className="single">
      {/* https://react-hot-toast.com/ */}
      <Toaster toastOptions={{ duration: 2000 }} />
      {/* https://mui.com/material-ui/react-dialog/#form-dialogs */}
      <Dialog open={open}>
        <DialogTitle>Delete Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To delete account, please enter your password here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            // https://mui.com/material-ui/api/text-field/
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            CANCEL
          </Button>
          <Button onClick={handleDeleteAccount}>OK</Button>
        </DialogActions>
      </Dialog>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to="/users/edit" style={{ textDecoration: "none" }}>
              <div className="editButton">Edit</div>
            </Link>
            <h1 className="title">Information</h1>
            {/* Not gg to use users as a class name -> item would be more general */}
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">jane1</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">jane1@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered Date:</span>
                  <span className="itemValue">01 Jan 2023</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+65 8888 9999</span>
                </div>
              </div>
              <div
                className="deleteButton"
                onClick={() => {
                  setOpen(true);
                }}
              >
                Delete Account
              </div>
            </div>
          </div>
          <div className="right">
            {/* <Chart aspect={3 / 1} title={"Storage Usage"} /> */}
            <h1 className="title">Storage Usage</h1>
            <Pie />
            <div className="increaseButton" onClick={handleStorageIncrease}>
              Increase Storage
            </div>
            <div className="decreaseButton" onClick={handleStorageDecrease}>
              Decrease Storage
            </div>
          </div>
        </div>
        <div className="bottom">
          <FileManager title="Files" />
        </div>
      </div>
    </div>
  );
};

export default Single;
