import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ShareIcon from '@mui/icons-material/Share';
// import InsertChartIcon from "@mui/icons-material/InsertChart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
// import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import StorageIcon from "@mui/icons-material/Storage";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
// import UploadFileIcon from "@mui/icons-material/UploadFile";
// import UpdateIcon from "@mui/icons-material/Update";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/joy/LinearProgress";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";

import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebase";
import { signOut } from "firebase/auth";
import instance from "../../axios_config";

import Logo from "../../img/logo2_capture-removebg.png";
import AdminLogo from "../../img/admin_logo.png"

const Sidebar = () => {
  const { currentUser } = useContext(AuthContext);
  // const [ fileStorage_Limit, setFileStorageLimit] = useState(1000000000); // FREETIER 1000000000 1073741824
  const fileStorage_Limit = 1000000000; // FREETIER 1000000000 1073741824
  // const [ storageLeft, setStorageLeft ] = useState();
  // const [converted_maxStorage_Admin, convert_StorageLimit_Admin] = useState();
  const [ convert_storage_limit, convert_StorageLimit] = useState();
  // const [ clientID, getClientID ] = useState();
  const [ percentile_used, setPercentile_used ] = useState();
  const [ amount, setAmount ] = useState(``);
  const [admin, setAdmin] = useState();
  const { dispatchDarkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate(); 

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

  useEffect (() => {
      const getTotalData = async () => {
        if (admin === false) {
          // GET CLIENT_ID FIRST
          const cid = await instance.get(`client/getid/${currentUser.uid}`)
          // getClientID(cid.data.client_id);
          var client_id = cid.data.client_id;
          console.log("Client ID: ", client_id);

          const getClientStorageData = async () => {
            const res = await instance.get(`client/filestorage/used/${client_id}`);
            const total_files_stored = res.data.result.filesize__sum;
            console.log("Total Files stored by client: ", total_files_stored);
            
            const percentile = (total_files_stored / fileStorage_Limit ) * 100; // By Default 1GB per user
            setPercentile_used(parseFloat(percentile.toFixed(2)));
            const storage_Left = fileStorage_Limit - total_files_stored;
            console.log("Storage left in client: ", storage_Left);
            return { total_files_stored };
          };

          // Function to convert bytes to human-readable sizes
          const convertSize = (value) => {
            const sizes = ['B', 'KB', 'MB', 'GB'];
            let index = 0;
            while (value >= 1000 && index < sizes.length - 1) {
              value /= 1000;
              index++;
            }
            if(value === null) {
              return `${(0)}${sizes[index]}`;
            }
            return `${value.toFixed(2)}${sizes[index]}`;
          };

          // Fetch storage-related data
          const { total_files_stored } = await getClientStorageData();

          // Set converted storage amount and storage left
          setAmount(convertSize(total_files_stored));
          // setStorageLeft(convertSize(storage_Left));
          convert_StorageLimit(convertSize(fileStorage_Limit));

          // Fetch total number of files uploaded by client
          const rs = await instance.get(`client/countfiles/${client_id}`);
          const total_files = rs.data.result;
          console.log("Total files in server: ", total_files);
        }
      }
      getTotalData();
  }, [admin, currentUser.uid, fileStorage_Limit])
 




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
              {/* <span className="logo">
                {admin ? "OnlyFile Admin" : "OnlyFile"}
              </span> */}
              <img className="logoImg" src={admin ? AdminLogo : Logo} alt="Logo" />
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
              {/* <li>
                <Link to="/admin-drive" style={{ textDecoration: "none" }}>
                  <InsertDriveFileIcon className="icon" />
                  <span>Files</span>
                </Link>
              </li> */}
              {/* <p className="title">SERVICE</p>
              <li>
                <InsertChartIcon className="icon" />
                <span>Statistics</span>
              </li>
              <li>
                <Link to="/systemhealth" style={{ textDecoration: "none" }}>
                  <SettingsSystemDaydreamOutlinedIcon className="icon" />
                  <span>System Health</span>
                </Link>
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
              </li> */}
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
              {/* <span className="logo">
                {admin ? "OnlyFile Admin" : "OnlyFile"}
              </span> */}
              <img className="logoImg" src={admin ? AdminLogo : Logo} alt="Logo" />
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
              {/* <li>
                <Link to="/my-drive" style={{ textDecoration: "none" }}>
                  <StorageIcon className="icon" />
                  <span>My Drive</span>
                </Link>
              </li> */}
              {/* <li>
                <Link to="/files/upload" style={{ textDecoration: "none" }}>
                  <UploadFileIcon className="icon" />
                  <span>Upload Files</span>
                </Link>
              </li> */}
              {/* <li>
                <Link to="/files/update" style={{ textDecoration: "none" }}>
                  <UpdateIcon className="icon" />
                  <span>Update Files</span>
                </Link>
              </li> */}
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
                <Link to="/files/sharing" style={{ textDecoration: "none" }}>
                  <ShareIcon className="icon" />
                  <span>Sharing</span>
                </Link>
              </li>
              <li>
                <Link to="/files/trash" style={{ textDecoration: "none" }}>
                  <DeleteIcon className="icon" />
                  <span>Trash</span>
                </Link>
              </li>
              {/* <p className="title">SERVICE</p>
              <li>
                <NotificationsNoneIcon className="icon" />
                <span>Notifications</span>
              </li>
              <li>
                <Link to="/enquiries" style={{ textDecoration: "none" }}>
                  <SupportAgentIcon className="icon" />
                  <span>Enquiries</span>
                </Link>
              </li> */}
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
                value={percentile_used}
              />
            </Box>
          </div>
          <div className="barComment">{amount} of {convert_storage_limit} used</div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
