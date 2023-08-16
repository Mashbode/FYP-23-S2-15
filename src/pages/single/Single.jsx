import "./single.scss";
import "./single2.scss";
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
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  deleteUser,
} from "firebase/auth";
import instance from "../../axios_config"; // axios instance
import { setCulture } from "@syncfusion/ej2-base";

const Single = () => {
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogDescription, setDialogDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { dispatch, currentUser } = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [registeredDate, setRegisteredDate] = useState();
  const [ uid, setUid ] = useState();

  // ******************save auth currentUser data*********************
  // solves page refresh data not loaded issue
  const [ userLogin, setCurrentUser] = useState(null); 

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });

    return () => unsubscribe(); // Unsubscribe when component unmounts
  }, []);
  // *****************************************************************

  // Function to get the user's account details from postgresql
  const fetchUserData = async () => {
    if (userLogin) {
      try {
        const response = await instance.get(`/${userLogin.uid}`);
        const data = response.data;
        console.log("get request: ", data);
        console.log("currentUser: ", currentUser.data);
        setUid(userLogin.uid); // save uid in usestate
        setFirstName(data.f_name);
        setLastName(data.l_name);
        setUsername(data.username);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setRegisteredDate(userLogin.metadata.creationTime); // creation time from firebase auth
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
        console.log("User is not logged in.");
    }
  };
  useEffect( ()=> {
      fetchUserData();
  }, [userLogin]); // dependency from save auth currentUser data

  
  const handleDeleteUser = () => {
    // https://firebase.google.com/docs/auth/web/manage-users#delete_a_user
    // this deletes user account from firebase auth
    deleteUser(auth.currentUser)
      .then( async () => {
        // ************************************************************ Connect with Django ************************************************************
        // User deleted.
        // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
        console.log("Check user: ", uid);
        // request delete user account entirely from postgresql
        const res = await instance.delete(`user/client/delete/${uid}`);
        console.log("Response from delete: ", res);
        if(res.data === "Deleted") {
          console.log("User account is: ", res.data);
          // remove user account profile from firebase db
          deleteDoc(doc(db, "users", uid));
          toast.success("Your account deleted successfully!");
          setTimeout(() => {
            dispatch({ type: "LOGOUT" });
          }, 2000);         
        } else {
          alert('Account deleted but not entirely! Contact Admin!');
        }
        // Write codes to delete the user from the backend
        // *********************************************************************************************************************************************
      })
      .catch((error) => {
        // An error ocurred
        toast.error(`Contact admin: ${error.code}`);
        console.log("Error deleting user account: ", error);
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

  // https://firebase.google.com/docs/reference/node/firebase.auth.EmailAuthProvider#static-credential
  // https://stackoverflow.com/questions/39872885/using-firebase-reauthenticate
  const handleEditProfile = () => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // User re-authenticated.
        navigate("/users/edit");
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

  // https://firebase.google.com/docs/reference/node/firebase.auth.EmailAuthProvider#static-credential
  // https://stackoverflow.com/questions/39872885/using-firebase-reauthenticate
  const handleChangePassword = () => {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    reauthenticateWithCredential(auth.currentUser, credential)
      .then(() => {
        // User re-authenticated.
        navigate("/users/change-password");
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
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{dialogDescription}</DialogContentText>
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
          <Button
            onClick={() => {
              switch (dialogTitle) {
                case "Edit Profile":
                  handleEditProfile();
                  break;
                case "Delete Account":
                  handleDeleteAccount();
                  break;
                case "Change Password":
                  handleChangePassword();
                  break;
                default:
                  break;
              }
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top-container">
          <div className="top-left">
            <h3 className="title">Information</h3>
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
                  <span className="itemValue">{registeredDate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{phone}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="top-right">
            <div className="button-group">
              <div
                className="button"
                onClick={() => {
                  setDialogTitle("Edit Profile");
                  setDialogDescription(
                    "To edit profile, please enter your password here."
                  );
                  setOpen(true);
                }}
              >
                Edit Profile
              </div>
              {/* <Link
                to="/users/change-password"
                style={{ textDecoration: "none" }}
              > */}
              <div
                className="button"
                onClick={() => {
                  setDialogTitle("Change Password");
                  setDialogDescription(
                    "To change password, please enter your password here."
                  );
                  setOpen(true);
                }}
              >
                Change Password
              </div>
              {/* </Link> */}
              <div
                className="button"
                onClick={() => {
                  setDialogTitle("Delete Account");
                  setDialogDescription(
                    "To delete account, please enter your password here."
                  );
                  setOpen(true);
                }}
              >
                Delete Account
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          {/* <FileManager title="Files" /> */}
          {/* <Chart aspect={3 / 1} title={"Storage Usage"} /> */}
          <div className="bottom-left">
            <h3 className="title">Storage Usage</h3>
            <Pie />
          </div>
          <div className="bottom-right">
            <div className="button-group">
              <div className="button" onClick={handleStorageIncrease}>
                Increase Storage
              </div>
              <div className="button" onClick={handleStorageDecrease}>
                Decrease Storage
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Single;
