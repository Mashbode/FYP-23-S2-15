import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
// import LocalShippingIcon from "@mui/icons-material/LocalShipping";
// import CreditCardIcon from "@mui/icons-material/CreditCard";
// import StoreIcon from "@mui/icons-material/Store";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import InsertChartIcon from "@mui/icons-material/InsertChart";
// import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
// import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
// import {DashboardIcon, PersonOutlineIcon} from "@mui/icons-material"; // -> Upper can be abbreviated
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Sidebar = () => {
  // Run only once when the component is build
  useEffect(() => {
    const fetchUserType = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")); // Getting a user from local storage
        const docSnap = await getDoc(doc(db, "users", user.uid)); // uid is the document id of "users"

        if (docSnap.exists()) {
          {
            docSnap.data().type === "admin" ? setAdmin(true) : setAdmin(false);
          }
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserType();
  }, []);

  const [admin, setAdmin] = useState();
  const { dispatchDarkMode } = useContext(DarkModeContext);
  const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">filesystemadmin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          {admin && (
            <li>
              <Link to="/users" style={{ textDecoration: "none" }}>
                <PersonOutlineIcon className="icon" />
                <span>Users</span>
              </Link>
            </li>
          )}
          {/* <li>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <StoreIcon className="icon" />
              <span>Products</span>
            </Link>
          </li> */}
          <li>
            <Link to="/files" style={{ textDecoration: "none" }}>
              <InsertDriveFileIcon className="icon" />
              <span>Files</span>
            </Link>
          </li>
          {/* <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          {/* <p className="title">USEFUL</p>
          <li>
            <InsertChartIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li> */}
          <p className="title">SERVICE</p>
          {admin && (
            <li>
              <InsertChartIcon className="icon" />
              <span>Statistics</span>
            </li>
          )}
          {admin && (
            <li>
              <SettingsSystemDaydreamOutlinedIcon className="icon" />
              <span>System Health</span>
            </li>
          )}
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <SupportAgentIcon className="icon" />
            <span>Enqueries</span>
          </li>
          {/* <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li> */}
          <p className="title">USER</p>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <Link
              to="/login"
              style={{ textDecoration: "none" }}
              onClick={handleLogout}
            >
              <ExitToAppIcon className="icon" />
              <span>Logout</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatchDarkMode({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatchDarkMode({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
