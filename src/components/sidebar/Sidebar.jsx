import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import StorageIcon from "@mui/icons-material/Storage";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import UpdateIcon from "@mui/icons-material/Update";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/joy/LinearProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);

  // Run only once when the component is build
  useEffect(() => {
    // async includes await function
    // This is to differentiate the sidebar contents according to the type of user
    const getUserType = async () => {
      // https://firebase.google.com/docs/firestore/query-data/get-data#get_a_document
      const docSnap = await getDoc(doc(db, "users", currentUser.uid)); // uid is the document id of "users" to distinguish the users
      if (docSnap.exists()) {
        // field inside a document = Admin => setAdmin true
        // field inside a document = else => setAdmin false
        docSnap.data().type === "Admin" ? setAdmin(true) : setAdmin(false);
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    getUserType();
  }, [currentUser]);

  const [admin, setAdmin] = useState();
  const { dispatchDarkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      })
      .catch(() => {
        // An error happened.
      });
  };

  return (
    <div className="sidebar">
      {admin ? (
        // Admin's sidebar
        <>
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">
                {admin ? "Secure File Sharing Admin" : "Secure File Sharing"}
              </span>
            </Link>
          </div>
          <hr />
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <li>
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </Link>
              </li>

              <p className="title">LISTS</p>
              <li>
                <Link to="/users" style={{ textDecoration: "none" }}>
                  <PersonOutlineIcon className="icon" />
                  <span>Users</span>
                </Link>
              </li>
              <li>
                <Link to="/admin-drive" style={{ textDecoration: "none" }}>
                  <InsertDriveFileIcon className="icon" />
                  <span>Files</span>
                </Link>
              </li>
              <p className="title">SERVICE</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Statistics</span>
              </li>
              <li>
                <SettingsSystemDaydreamOutlinedIcon className="icon" />
                <span>System Health</span>
              </li>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li>
              <li>
                <Link to="/enquiries" style={{ textDecoration: "none" }}>
                  <SupportAgentIcon className="icon" />
                  <span>Enquiries</span>
                </Link>
              </li>
              <p className="title">USER</p>
              <li>
                <Link to="/users/profile" style={{ textDecoration: "none" }}>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  <ExitToAppIcon className="icon" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="middle">
            <div
              className="colorOption"
              onClick={() => dispatchDarkMode({ type: "LIGHT" })}
            ></div>
            <div
              className="colorOption"
              onClick={() => dispatchDarkMode({ type: "DARK" })}
            ></div>
          </div>
        </>
      ) : (
        // Client's sidebar
        <>
          <div className="top">
            <Link to="/" style={{ textDecoration: "none" }}>
              <span className="logo">
                {admin ? "Secure File Sharing Admin" : "Secure File Sharing"}
              </span>
            </Link>
          </div>
          <hr />
          <div className="center">
            <ul>
              <p className="title">MAIN</p>
              <li>
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <DashboardIcon className="icon" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/my-drive" style={{ textDecoration: "none" }}>
                  <StorageIcon className="icon" />
                  <span>My Drive</span>
                </Link>
              </li>
              <li>
                <Link to="/files/upload" style={{ textDecoration: "none" }}>
                  <UploadFileIcon className="icon" />
                  <span>Upload Files</span>
                </Link>
              </li>
              <li>
                <Link to="/files/update" style={{ textDecoration: "none" }}>
                  <UpdateIcon className="icon" />
                  <span>Update Files</span>
                </Link>
              </li>
              <p className="title">LISTS</p>
              <li>
                <Link to="/files" style={{ textDecoration: "none" }}>
                  <InsertDriveFileIcon className="icon" />
                  <span>Files</span>
                </Link>
              </li>
              <li>
                <Link to="/files/shared" style={{ textDecoration: "none" }}>
                  <PeopleAltOutlinedIcon className="icon" />
                  <span>Shared</span>
                </Link>
              </li>
              <li>
                <Link to="/files/trash" style={{ textDecoration: "none" }}>
                  <DeleteIcon className="icon" />
                  <span>Trash</span>
                </Link>
              </li>
              <p className="title">SERVICE</p>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li>
              <li>
                <Link to="/enquiries" style={{ textDecoration: "none" }}>
                  <SupportAgentIcon className="icon" />
                  <span>Enquiries</span>
                </Link>
              </li>
              <p className="title">USER</p>
              <li>
                <Link to="/users/profile" style={{ textDecoration: "none" }}>
                  <AccountCircleOutlinedIcon className="icon" />
                  <span>Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  style={{ textDecoration: "none" }}
                  onClick={handleLogout}
                >
                  <ExitToAppIcon className="icon" />
                  <span>Logout</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="middle">
            <div
              className="colorOption"
              onClick={() => dispatchDarkMode({ type: "LIGHT" })}
            ></div>
            <div
              className="colorOption"
              onClick={() => dispatchDarkMode({ type: "DARK" })}
            ></div>
          </div>
          <div className="bottom">
            <Box sx={{ width: "100%" }}>
              <LinearProgress
                // color="primary"
                determinate={true}
                // size="md"
                value={30}
              />
            </Box>
          </div>
          <div className="barComment">5 GB of 20 GB used</div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
