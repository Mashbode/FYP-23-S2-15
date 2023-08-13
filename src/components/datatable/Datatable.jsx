import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { toast, Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  userColumns,
  fileColumns,
  sharedColumns,
  trashColumns,
  enquiryColumns,
} from "../../datatablesource";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { ThreeDots } from "react-loader-spinner"; // npm install react-loader-spinner --save
import instance from "../../axios_config";

// Pass type prop if u want to apply it to both users & products
const Datatable = ({ type }) => {
  // const [data, setData] = useState(userRows);
  const [ data, setData ] = useState([]);
  const { currentUser } = useContext(AuthContext);
  // axios
  const [ isLoading, setLoading ] = useState(true); // loading icon shown or not
  // const [ userID, setUID ] = useState(""); // get user id
  const [clientID, setClientID] = useState(""); // get client id
  // const [ fileID, setFilesID ] = useState(); // get file's ID
  // const [ fileName, setFilesName ] = useState(""); // get file's name
  // const [ fileLastModified, setFileLastModified] = useState(); // get file's last modified timestamp

  // 1. Delete the user from the database
  // 2. The user needs to be deleted from the Firebase -> Authentication -> Users manually as re-authentication requires the user's password (https://firebase.google.com/docs/auth/web/manage-users#re-authenticate_a_user)
  const handleUserDelete = async (id) => {
    try {
      if (window.confirm("Are you sure to delete the user?")) {
        // ******************************* Connect with Django *******************************
        // https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents
        await deleteDoc(doc(db, "users", id)); // doc(db, collection, id)
        setData(data.filter((item) => item.id !== id)); // If used on its own, the data is not deleted when refreshed

        // Write codes to delete the user from the backend
        // ***********************************************************************************

        toast("The user also needs to be deleted inside Firebase!", {
          icon: "⚠️",
        });
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ****************************************************** Connect with Django ******************************************************

  // file download
  const handleFileDownload = async (params) => {
    try {
      console.log(params.row.id);
      
      toast.loading(`${params.row.filename} downloading`);
      
      const response = await instance.get(`retrievefile/${params.row.id}`, {
        responseType: 'blob', // Important for handling binary data
      });
      
      // Create a URL object from the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));
  
      // Create a temporary anchor element to initiate the download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${params.row.filename}${params.row.filetype}`; // Set the filename and extension for download
      document.body.appendChild(link);
      link.click();
  
      // Clean up the URL and anchor
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);

    } catch (error) {
      toast.error("Failed to download, please contact admin");
      console.error('Error downloading file: ', error);
    }
  };
  // *********************************************************************************************************************************
  // file sharing
  const handleFileShare = async (params) => {
    try {
      // ****************************************************** Connect with Django ******************************************************
      var email = prompt("Please enter a user's email to share");

      const response = await instance.post(`fileshare/${email}/${params.row.id}/${params.row.username}`);
      console.log("File Share response: ", response.data);

      if (response.data === 'yes') {
        // Email registrant exists
        toast.success(`${params.row.filename} shared successfully`);
      } else if (response.data === 'no') {
        // Email registrant does not exist
        toast.error(`Registrant wih "${email}" does not exist`)
      }

      console.log(params.row.id); // fileID to share

      // *********************************************************************************************************************************
    } catch (error) {
      console.log("Error sharing file: ", error);
    }
  };

  const handleFileUnshare = (params) => {
    try {
      // ****************************************************** Connect with Django ******************************************************
      // *********************************************************************************************************************************
    } catch (error) {
      console.log(error);
    }
  };

  // file deletion
  const handleFileDelete = async (params) => {
    try {
      // url for deleting file requires field_id and client_id
      const response = await instance.get(`fileDelete/${params.row.id}/${params.row.username}`);
      
      // check response of Delete request from django
      console.log("Deletion Response: ", response.data);
      if (response.data.status === 'success') {
        toast.success(`${params.row.filename} deleted successfully`);
        // Perform any other necessary actions after successful deletion.
        load_all_data();
      } else {
        toast.error(`${params.row.filename} deletion failed`);
        // Handle the error case appropriately.
      }
    } catch (error) {
      console.log("Error deleting file: ", error);
    }
  };

  const handleFileRestore = (params) => {
    try {
      // ****************************************************** Connect with Django ******************************************************
      // *********************************************************************************************************************************
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileDeleteForever = async (params) => {
    try {
      if (window.confirm("Are you sure to delete the file?")) {
        // Delete the document
        await deleteDoc(doc(db, "files", params.row.id)); // doc(db, collection, id)

        // Delete the file inside storage
        const name = `${currentUser.uid}_files/${params.row.filename}`;
        const storage = getStorage();
        const storageRef = ref(storage, name);

        // Delete the file
        deleteObject(storageRef)
          .then(() => {
            console.log("File deleted successfully");
          })
          .catch((error) => {
            console.log(error);
          });

        setData(data.filter((item) => item.id !== params.row.id)); // If used on its own, when refreshed the data is not deleted
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // These actionColumns will be concat to columns below
  const actionUserColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      // https://mui.com/x/react-data-grid/
      // params are from rows={data} as a prop of <DataGrid></DataGrid>
      // valueGetter
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={`/users/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="actionButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleUserDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionFileColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/files/test" style={{ textDecoration: "none" }}>
              <div className="actionButton">Download</div>
            </Link> */}
            {/* <a href={params.row.file} className="actionButton" download>
              Download
            </a> */}
            <div
              className="actionButton"
              onClick={() => handleFileDownload(params)}
            >
              Download
            </div>
            <div
              className="actionButton"
              onClick={() => handleFileShare(params)}
            >
              Share
            </div>
            <div
              className="deleteButton"
              onClick={() => handleFileDelete(params)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionSharedColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* Same with actionFileColumn above */}
            <a href={params.row.file} className="actionButton" download>
              Download
            </a>
          </div>
        );
      },
    },
  ];

  const actionTrashColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="actionButton"
              onClick={() => handleFileRestore(params)}
            >
              Share
            </div>
            <div
              className="deleteButton"
              onClick={() => handleFileDeleteForever(params)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  const actionEnquiryColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="actionButton">Reply</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleUserDelete(params.row.id)}
            >
              Delete
            </div>
            <div
              className="actionButton"
              onClick={() => handleFileUnshare(params)}
            >
              Unshare
            </div>
          </div>
        );
      },
    },
  ];

  // These are to choose what columns and action buttons to put according to type
  var columns;
  var actionColumn;
  switch (type) {
    case "users":
      columns = userColumns;
      actionColumn = actionUserColumn;
      break;
    case "files":
      columns = fileColumns;
      actionColumn = actionFileColumn;
      break;
    case "shared":
      columns = sharedColumns;
      actionColumn = actionSharedColumns;
      break;
    case "trash":
      columns = trashColumns;
      actionColumn = actionTrashColumns;
      break;
    case "enquiries":
      columns = enquiryColumns;
      actionColumn = actionEnquiryColumn;
      break;
    default:
      break;
  }

  // Run only once when the component is build
  useEffect(() => {
    // ************************** Connect with Django **************************

    console.log("u_id: ", currentUser.uid);
    
    // get client_id from url: api/client/getid/<u_id>
    instance.get(`client/getid/${currentUser.uid}`)
      .then( (res) => {
          setClientID(res.data.client_id); 
          console.log("ClientID: ", res.data.client_id);
          // console.log('current client id: ', clientID ); value not print out as its not stored immediately in useState
        })
      .catch((err) => {
        console.log(err);
      })
      

    // Return a cleanup function to stop listening
      
    // *************************************************************************
  }, []);
  
  // function to load/rerender all data in table 
  const load_all_data = () => {
    if (clientID != "") {
      setLoading(true);
      // load all the user's files
      // let client_file_id_url = `client/file/${clientID}`
      instance
        .get(`client/file/${clientID}`) // retrieve list of files under client_id
        .then((response) => {
          console.log(response.data);

          const data = response.data; // Assuming the response contains the data you provided

          const data_list = data.map((entry) => ({
            id: entry.file_id,
            filename: entry.filename,
            username: entry.client,
            timeStamp: entry.last_change,
            filetype: entry.filetype // for download file insert extension type
          }));
          console.log("Data_list: ", data_list);
          setData(data_list);

          // console.log("Data: ", data); it wont load in yet
          setLoading(false);
          console.log(
            "Data table retrieved list of files under client",
            clientID
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    console.log("Client__ID: ", clientID);

    load_all_data();

  }, [clientID]);
  
  // renders a three dot loading screen when data table is loading up
  // else data table is rendered successfully
  if (isLoading) {
    return (
      <div className="loadingContainer">
        <ThreeDots
          type="ThreeDots"
          color="#00b22d"
          height={100}
          width={100}
          //3 secs
        />
      </div>
    );
  } else {
    return (
      <div className="datatable">
        {/* https://react-hot-toast.com/ */}
        <Toaster toastOptions={{ duration: 3000 }} />
        <div className="datatableTitle">
          {/* Title of the datatable = Type with the first letter changed to upper case */}
          {type.replace(/^./, type[0].toUpperCase())}
          {/* <Link to={`/${type}/new`} className="link">
          Add New
        </Link> */}
        </div>
        {/* https://mui.com/x/react-data-grid/ */}
        <DataGrid
          className="datagrid"
          rows={data}
          columns={columns.concat(actionColumn)}
          slots={{
            toolbar: GridToolbar,
          }} // https://mui.com/x/react-data-grid/filtering/
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
        />
      </div>
    );
  }
};

export default Datatable;
