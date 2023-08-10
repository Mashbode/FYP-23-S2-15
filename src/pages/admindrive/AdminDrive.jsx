import "./admindrive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileManagerContainer from "../../components/filemanagercontainer/FileManagerContainer";

import { AuthContext } from "../../context/AuthContext";

import { useEffect, useState, useContext } from "react";

const AdminDrive = () => {
  // ************************************************************ Connect with Django ************************************************************
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.uid);

  const [axiosFileItems, setAxiosFileItems] = useState([]);
  const getAxiosAdminDriveFileItems = () => {
    // Write codes to fetch the data from the backend with inside a root file directory "/" in objects inside array format e.g., data.js
    // When the array is returned make sure to use below setAxiosFileItems(return value)
    setAxiosFileItems();
  };
  // *********************************************************************************************************************************************

  // Run only once the app is rendered
  useEffect(() => {
    getAxiosAdminDriveFileItems();
  }, []);

  return (
    <div className="adminDrive">
      <Sidebar />
      <div className="adminDriveContainer">
        <Navbar />
        <FileManagerContainer
          title="Admin Drive"
          axiosFileItems={axiosFileItems}
        />
      </div>
    </div>
  );
};

export default AdminDrive;
