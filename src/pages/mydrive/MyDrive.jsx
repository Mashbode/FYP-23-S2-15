import "./mydrive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import {
  DetailsView,
  FileManagerComponent,
  NavigationPane,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-filemanager";
// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXhfeXRWRGJeVUZ0WUY="
);

const MyDrive = () => {
  var hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";
  // var hostUrl = "http://localhost:8090/"; // Local storage - Node.js file system

  const onSuccess = () => {
    console.log("Request successful");
  };
  const onFailure = () => {
    console.log("Request has failed");
  };

  return (
    <div className="myDrive">
      <Sidebar />
      <div className="myDriveContainer">
        <Navbar />
        <div className="myDriveContents">
          <div className="myDriveTitle">My Drive</div>
          <div className="control-section">
            <FileManagerComponent
              id="file"
              view="Details" // Either LargeIcons or Details
              enablePersistence={true} // maintain the component state on page reload - view, path, selected items
              ajaxSettings={{
                getImageUrl: hostUrl + "api/FileManager/GetImage", // Image preview support
                downloadUrl: hostUrl + "api/FileManager/Download", // File download support
                uploadUrl: hostUrl + "api/FileManager/Upload", // File upload support
                url: hostUrl + "api/FileManager/FileOperations",

                // Local storage - Node.js file system
                // getImageUrl: hostUrl + "GetImage", // Image preview support
                // downloadUrl: hostUrl + "Download", // File download support
                // uploadUrl: hostUrl + "Upload", // File upload support
                // url: hostUrl,
              }}
              success={onSuccess.bind(this)}
              failure={onFailure.bind(this)}
            >
              <Inject services={[NavigationPane, DetailsView, Toolbar]} />
            </FileManagerComponent>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDrive;
