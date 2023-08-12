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
import { db, auth } from "../../firebase";
import {
  userColumns,
  fileColumns,
  sharedColumns,
  trashColumns,
  enquiryColumns,
} from "../../datatablesource";
import { getStorage, ref, deleteObject } from "firebase/storage";
import instance from "../../axios_config";

// Pass type prop if u want to apply it to both users & products
const Datatable = ({ type }) => {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  // axios
  // const [ userID, setUID ] = useState(""); // get user id
  const [clientID, setClientID] = useState(""); // get client id
  const [userFiles, setUserFiles] = useState([]); // get all client id's file
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

  const getUserIDWithEmail = async (email) => {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    try {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        return doc.id;
      });
    } catch (error) {
      switch (error) {
        case "case1":
          toast.error("case1 error");
          break;
        case "case2":
          toast.error("case2 error");
          break;
        default:
          toast.error(`Contact admin: ${error}`);
          break;
      }
    }
  };
  // *********************************************************************************************************************************

  const handleFileShare = (params) => {
    try {
      // ****************************************************** Connect with Django ******************************************************
      var email = prompt("Please enter a user's email to share");
      var userToShareID = getUserIDWithEmail(email);
      console.log(params.row.id); // fileID to share
      // *********************************************************************************************************************************
    } catch (error) {
      console.log(error);
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

  const handleFileDelete = async (params) => {
    try {
      // ****************************************************** Connect with Django ******************************************************
      // *********************************************************************************************************************************
    } catch (error) {
      console.log(error);
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
            <a href={params.row.file} className="actionButton" download>
              Download
            </a>
            {/* <div
              className="actionButton"
              onClick={() => handleFileDownload(params)}
            >
              Download
            </div> */}
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
              Delete forever
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
    console.log("u_id: ", auth.currentUser.uid);

    instance
      .get("client/" + auth.currentUser.uid)
      .then((res) => {
        setClientID(res.data.client_id); // get client_id from url: api/Client
        console.log("ClientID: ", res.data.client_id);
        // console.log('current client id: ', clientID );
      })
      .catch((err) => {
        console.log(err);
      });
    // *************************************************************************
  }, []);

  useEffect(() => {
    console.log("Client__ID: ", clientID);
    if (clientID != "") {
      // load all the user's files
      // let client_file_id_url = `client/file/${clientID}`
      instance
        .get("client/file/" + clientID) // retrieve list of files under client_id
        .then((response) => {
          console.log(response.data);

          const data = response.data; // Assuming the response contains the data you provided

          const data_list = data.map((entry) => ({
            id: entry.file_id,
            filename: entry.filename,
            username: entry.client,
            timeStamp: entry.last_change,
          }));
          console.log("Data_list: ", data_list);
          setUserFiles(data_list);

          // console.log("userFiles: ", userFiles); it wont load in yet

          console.log(
            "Data table retrieved list of files under client",
            clientID
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clientID]);

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
        // rows={data}
        rows={userFiles}
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
};

export default Datatable;
