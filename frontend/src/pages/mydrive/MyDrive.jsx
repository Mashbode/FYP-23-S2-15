import "./myDrive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { FileManagerComponent } from "@syncfusion/ej2-react-filemanager";
import * as React from "react";

// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NGaF5cXmdCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdgWXhfeXRWRGJeVUZ0WUY="
);

const MyDrive = () => {
  let hostUrl = "https://ej2-aspcore-service.azurewebsites.net/";

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <h1>My Drive</h1>
        {/* <div className="files">
          <FileTable />
        </div> */}

        <div className="control-section">
          <FileManagerComponent
            id="file"
            ajaxSettings={{
              url: hostUrl + "api/FileManager/FileOperations",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyDrive;
