import "./myDrive.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import { FileManagerComponent } from "@syncfusion/ej2-react-filemanager";
import * as React from "react";

// Registering Syncfusion license key
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt9QHFqVk5rW05Ff0BAXWFKblJ3T2ZbdV10ZCQ7a15RRnVfRVxkSHpSdUVnUHdcdA==;Mgo+DSMBPh8sVXJ2S0d+X1lPcUBDVHxLflF1VWJYdVtyflZCcC0sT3RfQF5jTn9Ud0FiWn9aeX1cQg==;ORg4AjUWIQA/Gnt2V1hhQlJMfVhdXGpWfFN0RnNYflR1dl9FZEwgOX1dQl9gSXlScURnWHxedXRXRmQ=;MjU4MTMwNEAzMjMyMmUzMDJlMzBaWnAzRlE0TExGVXpkeW5iWVg1ZUwvRTRjK1liYUppR2NUUjd2eDQrbVBNPQ==;MjU4MTMwNUAzMjMyMmUzMDJlMzBaa3ZybDVWUkt6MkphWDB4OWg4KzJZWS9yRWFLeW0xK2hGb3JlSGg4cm0wPQ==;NRAiBiAaIQQuGjN/V0R+XU9HflRFQmJAYVF2R2BJfl96cVdMY1hBNQtUQF1hSn5Ud0JiXX5dcHFVTmdY;MjU4MTMwN0AzMjMyMmUzMDJlMzBnUnNiMnV2RDd2R1hSWkRXd0JtSklOcUZDaXNpWU5VSUhGdnE4M2NwYXFNPQ==;MjU4MTMwOEAzMjMyMmUzMDJlMzBDaUxNMzNZOGV6M1ZqeG1jVDRjbkJEa1hMK01QVndkZS95R1MrdlFDSjZNPQ==;Mgo+DSMBMAY9C3t2V1hhQlJMfVhdXGpWfFN0RnNYflR1dl9FZEwgOX1dQl9gSXlScURnWHxedXVQT2Q=;MjU4MTMxMEAzMjMyMmUzMDJlMzBBOVZDYjVDbWdSazR1Wjl5T1lkcWZEdGQrK3c2NGowT2RtaVVabnZBS2RVPQ==;MjU4MTMxMUAzMjMyMmUzMDJlMzBmZjh4MElMK1N1V0NlM21UVUlDY09ieTM4ZHorSUUyNXIxKzhPR3RXQ3V3PQ==;MjU4MTMxMkAzMjMyMmUzMDJlMzBnUnNiMnV2RDd2R1hSWkRXd0JtSklOcUZDaXNpWU5VSUhGdnE4M2NwYXFNPQ=="
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
