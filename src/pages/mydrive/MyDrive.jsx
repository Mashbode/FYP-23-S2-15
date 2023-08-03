import "./mydrive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileManagerContainer from "../../components/filemanagercontainer/FileManagerContainer";

import { AuthContext } from "../../context/AuthContext";

import { useEffect, useState, useContext } from "react";

const MyDrive = () => {
  // ************************************************************ Connect with Django ************************************************************
  const { currentUser } = useContext(AuthContext);
  // console.log(currentUser.uid);

  const [axiosFileItems, setAxiosFileItems] = useState([]);
  const getAxiosMyDriveFileItems = () => {
    // Write codes to fetch the data from the backend with inside a file directory "currentUser.uid/" in objects inside array format e.g., data.js
    // When the array is returned make sure to use below setAxiosFileItems(return value)
    setAxiosFileItems();
  };
  // *********************************************************************************************************************************************

  // Run only once the app is rendered
  useEffect(() => {
    getAxiosMyDriveFileItems();
  }, []);

  return (
    <div className="myDrive">
      <Sidebar />
      <div className="myDriveContainer">
        <Navbar />
        <FileManagerContainer
          title="My Drive"
          axiosFileItems={axiosFileItems}
        />
      </div>
    </div>
  );
};

export default MyDrive;
