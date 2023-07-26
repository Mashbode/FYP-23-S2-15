import "./mydrive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FileManager from "../../components/filemananger/FileManager";

const MyDrive = () => {
  return (
    <div className="myDrive">
      <Sidebar />
      <div className="myDriveContainer">
        <Navbar />
        <FileManager title="My Drive" />
      </div>
    </div>
  );
};

export default MyDrive;
