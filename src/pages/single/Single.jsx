import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
// import Chart from "../../components/chart/chart/Chart";
// import List from "../../components/table/Table";
import Pie from "../../components/chart/pie/Pie";
// import FileManager from "../../components/filemananger/FileManager";

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

import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import FileManagerContainer from "../../components/filemanagercontainer/FileManagerContainer";

const Single = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  const { dispatch, currentUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [registeredDate, setRegisteredDate] = useState();

  // Convert firebase timestamp to date format. (Ex. 8/26/2023)
  let date = new Date(registeredDate);
  let myDate = date.toLocaleDateString();
  let myTime = date.toLocaleTimeString();
  myDate = myDate.replaceAll("/", "-");
  const mmddyyyy = myDate + " " + myTime;

  // Function to fetch the authenticated user's data from Firestore
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setFirstName(userDoc.data().firstName);
          setLastName(userDoc.data().lastName);
          setUsername(userDoc.data().username);
          setEmail(userDoc.data().email);
          setPhoneNumber(userDoc.data().phone);
          setRegisteredDate(userDoc.data().timeStamp.toDate());
        }
      }
      console.log("REGISTERED DATE: " + registeredDate);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // ************************************************************ Connect with Django ************************************************************
  const [axiosFileItems, setAxiosFileItems] = useState([]);
  const getAxiosMyDriveFileItems = () => {
    // Write codes to fetch the data from the backend with inside a file directory "currentUser.uid/" in objects inside array format e.g., data.js
    // When the array is returned make sure to use below setAxiosFileItems(return value)
    setAxiosFileItems();
  };
  // *********************************************************************************************************************************************

  useEffect(() => {
    fetchUserData();
    getAxiosMyDriveFileItems();
  }, []);

  const handleDeleteUser = () => {
    // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
    deleteUser(auth.currentUser)
      .then(() => {
        // ************************************************************ Connect with Django ************************************************************
        // User deleted.
        // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
        deleteDoc(doc(db, "users", currentUser.uid));
        toast.success("Your account deleted successfully!");
        setTimeout(() => {
          dispatch({ type: "LOGOUT" });
        }, 2000);

        // Write codes to delete the user from the backend
        // *********************************************************************************************************************************************
      })
      .catch((error) => {
        // An error ocurred
        toast.error(`Contact admin: ${error.code}`);
      });
  };

  // https://firebase.google.com/docs/reference/node/firebase.auth.EmailAuthProvider#static-credential
  // https://stackoverflow.com/questions/39872885/using-firebase-reauthenticate
  const handleDeleteAccount = () => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
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
                <h1 className="itemTitle">{firstName + " " + lastName}</h1>
                <div className="detailItem">
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">{username}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered Date:</span>
                  <span className="itemValue">{mmddyyyy}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
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
          <FileManagerContainer
            title="My Drive"
            axiosFileItems={axiosFileItems}
          />
        </div>
      </div>
    </div>
  );
};

export default Single;
