import "./datatable.scss";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from "@mui/x-data-grid";
import FileUploadIcon from "@mui/icons-material/FileUpload";

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
import { ThreeDots } from "react-loader-spinner"; // npm install react-loader-spinner --save
import FileUploadModal from "./FileUploadModal"; // fix this
import instance from "../../axios_config";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDropzone } from 'react-dropzone'; // npm install --save react-dropzone

// Pass type prop if u want to apply it to both users & products
const Datatable = ({ type }) => {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);
  // axios
  const [isLoading, setLoading] = useState(false); // loading icon shown or not
  const [isModalOpen, setIsModalOpen] = useState(false); // fix this modal shown or not
  // const [ userID, setUID ] = useState(""); // get user id
  const [clientID, setClientID] = useState(""); // get client id

  //**************************************SUPERADMIN STUFF************************************** */
  const [adminID, setAdminID] = useState(""); // get admin id
  const [ usertype, setUsertype ] = useState(""); // get usertype
  const [ totalUsers, getTotalUsers ] = useState();

  //******************************************************************************************** */

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState([]);
  const [currentParams, setCurrentParams] = useState(null);

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
        await instance.delete(`user/client/delete/${id}`)
        .then((res) => {
          console.log("Response from delete: ", res);
          if(res.data === "Deleted") {
            console.log(`${id}'s account is: `, res.data);
            toast.success(`User account deleted successfully!`);
          } else {
            alert('Account deleted but not entirely!');
          }
        })
        .catch((err) => {
          console.log("Error deleting user: ", err);
        })

        toast("The user also needs to be deleted inside Firebase!", {
          icon: "⚠️",
        });
        // reload table after delete success
        setTimeout(() => {
          load_all_users();
        }, 2000);
      } else {
        return;
      }
    } catch (error) {
      toast.error("Failed to delete user, try again later");
      console.log("Error deleting user: ", error);
    }
  };

  // ****************************************************** Connect with Django ******************************************************

  // file download
  const handleFileDownload = async (params) => {
    try {
      console.log(params.row.id);

      toast.loading(`${params.row.fileName} downloading`);

      const response = await instance.get(`retrievefile/${params.row.id}`, {
        responseType: "blob", // Important for handling binary data
      });

      // Create a URL object from the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary anchor element to initiate the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${params.row.fileName}${params.row.fileType}`; // Set the filename and extension for download
      document.body.appendChild(link);
      link.click();

      // Clean up the URL and anchor
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      toast.error("Failed to download, please contact admin");
      console.error("Error downloading file: ", error);
    }
  };
  // *********************************************************************************************************************************
  // file sharing
  const handleFileShare = async (params) => {
    try {
      // ****************************************************** Connect with Django ******************************************************
      var email = prompt("Please enter a user's email to share");

      const response = await instance.post(
        `fileshare/${email}/${params.row.id}/${params.row.userName}`
      );
      console.log("File Share response: ", response.data);

      if (response.data === "yes") {
        // Email registrant exists
        toast.success(`${params.row.fileName} shared successfully`);
      } else if (response.data === "no") {
        // Email registrant does not exist
        toast.error(`Registrant wih "${email}" does not exist`);
      }

      console.log(params.row.id); // fileID to share

      // *********************************************************************************************************************************
    } catch (error) {
      console.log("Error sharing file: ", error);
    }
  };
  // File unshare (remove file shared to you)
  const handleFileUnshare = async (params) => {
    try {
      const response = await instance.delete(
        `SharedFileAccess/${params.row.share_id}`
      );
      console.log("Response from delete shared file: ", response);
      // reload shared file table
      toast.info(`${params.row.fileName} no longer shared`)
      setTimeout(() => {
         load_shared_files(); 
      }, 2000);
    } catch (error) {
      console.log("Error deleting shared file: ", error);
    }
  };

  //**************for update/upload open file pop-up modal********** */
  // fix this
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  ////////////////////////////////////////////////////////////////

  const handleClickOpen = (params) => {
    setOpen(true);
    setCurrentParams(params);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDrop = (acceptedFiles, params) => {
    setSelectedFile(acceptedFiles[0]); // Store the selected file object, not the array
    setCurrentParams(params); // Store the current params
    handleClickOpen();
    handleClose();
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  //********************************************************** */

  // file update
  // fix this
  // - it wont work as you need a modal/form to upload the newest file to update
  const handleFileUpdate = async (params) => {
    console.log("file_id: ", params.row.id);
    if (!selectedFile) {
      return;
    }
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // update file_id's content with the newest file
      const response = instance.put(`fileupdate/${params.row.id}`, formData);
      // Handle response if needed
      console.log("Response:", response.data);
      if (response.data === "file ok") {
        toast.info(`${params.row.fileName} successfully updated`);
        setTimeout(() => {
          load_shared_files();
        }, 2000);
      } else {
       toast.error(`${params.row.fileName} failed to update`);
       console.log("Failed to update: ", params.row.fileName);
      }
    } catch (error) {
      // Handle error if needed
      console.error("Error updating file: ", error.response);
    }
  };

  // const handleFileUpdate = async () => { // Remove the parameter
  //   if (!selectedFile || !currentParams) {
  //     setSelectedFile([]);
  //     return;
  //   }

  //   try {
  //     const formData = new FormData();
  //     formData.append("file", selectedFile);

  //     const response = await instance.post(
  //       `fileupdate/${currentParams.row.id}`,
  //       formData
  //     );
  //     console.log("File Update: ", response.data);

  //     if (response.data === "file ok") {
  //       toast.info(`${selectedFile.name} successfully updated`);
  //       load_shared_files();
  //     } else {
  //       toast.error(`${selectedFile.name} failed to update`);
  //     }
  //     setSelectedFile([]);
  //     // Close the dialog and perform any other necessary actions
  //     handleClose();
  //   } catch (error) {
  //     console.error("Error updating file: ", error);
  //     toast.error("An error occurred while updating the file");
  //     setSelectedFile([]);
  //   }
  // };

  // file deletion
  const handleFileDelete = async (params) => {
    try {
      // url for deleting file requires field_id and client_id
      const response = await instance.get(
        `fileDelete/${params.row.id}/${params.row.userName}`
      );

      // check response of Delete request from django
      console.log("Deletion Response: ", response.data);
      if (response.data.status === "success") {
        toast.success(`${params.row.fileName} deleted successfully`);
        // Perform any other necessary actions after successful deletion.
        setTimeout(() => {
          load_all_data();
        }, 2000);
      } else {
        toast.error(`${params.row.fileName} deletion failed`);
        // Handle the error case appropriately.
      }
    } catch (error) {
      console.log("Error deleting file: ", error);
    }
  };

  // file restore
  const handleFileRestore = async (params) => {
    try {
      // url for restoring a deleted file
      const response = await instance.get(`filerestore/${params.row.id}`);
      console.log("File Restore response: ", response.data);
      if (response.data === "restored") {
        toast.success(`${params.row.fileName} restored successfully`);
        load_trashed_files();
      } else {
        toast.error(`${params.row.fileName} failed restoring`);
        setSelectedFile([]);
      }
    } catch (error) {
      console.log("Error restoring file: ", error);
      setSelectedFile([]);
    }
  };

  // file delete permanently
  const handleFileDeleteForever = async (params) => {
    try {
      if (window.confirm("Are you sure to delete the file?")) {
        // URL for deleting file from logs (for deleting file from trashbin)
        const response = await instance.post(`filelog/delete/${params.row.id}`);
        console.log("File Log Deletion: ", response.data);
        if (response.data.result === "All gone") {
          console.log("File Log Delete: ", response.data.result);
          toast.success(`${params.row.fileName} deleted successfully`);
          setTimeout(() => {
            load_trashed_files();
          }, 2000);
        } else {
          toast.error("Delete unsuccessful");
        }
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
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
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
            <div>
              <div
                className="actionButton"
                onClick={() => handleClickOpen(params)}
              >
                Update
            </div>
              {open && <div className="overlay" />}
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Update File</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    Drop the file here or click to select a file.
                  </DialogContentText> */}
                  <div {...getRootProps()} className="drop-box">
                    <input {...getInputProps()} />
                    <p>Drag & drop a file here, or click to select a file</p>
                    {selectedFile ? (
                      <p>Selected file: {selectedFile.name}</p>
                    ) : (
                      <p>Selected file: {}</p>
                    )}
                  </div>
                  {/* {selectedFile.length > 0 && (
                    <p>Selected file: {selectedFile[0].name}</p>
                  )} */}
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => {handleFileUpdate(params);}}>
                    Update
                  </Button>
                  <Button onClick={handleClose}>
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {/* fix this, the modal somehow will be at the button */}
            {/* <div>
              <div className="actionButton" onClick={openModal}>
                Update
              </div>
              <FileUploadModal   // component of modal
                isOpen={isModalOpen} // open model
                closeModal={closeModal} // close modal
                fileID={params.row.id} // set file_id
                onFileUpdated={load_all_data} // load file data after update
              />
            </div> */}
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
            <div
              className="actionButton"
              onClick={() => handleFileDownload(params)}
            >
              Download
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

  const actionTrashColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 240,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="actionButton"
              onClick={() => handleFileRestore(params)}
            >
              Restore
            </div>
            <div
              className="deleteButton"
              onClick={() => handleFileDeleteForever(params)}
            >
              Delete permanently
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

  // // check usertype when page loads
  useEffect (()=>{
    // get user type
    let user_type = "";
    instance.get(`/${currentUser.uid}`)
      .then((res)=> {
        if(res.data.usertype !== null) {
          setUsertype(res.data.usertype); // setState will not save data immediately
          user_type = res.data.usertype; // to store within useEffect
        }
        console.log("Usertype: ",res.data.usertype);
      })
      .catch((err)=> {
        console.log("Error getting usertype: ", err);
      });
      console.log("user_type: ", user_type);
  }, [currentUser.uid, type]) // added dependencies

  // Run only once when the component is build
  useEffect(() => {
    // ************************** Connect with Django **************************
    
    // get client_id
      if (usertype === "Admin") {
        console.log("return");
        return; // do nothing
      } 
      else if (usertype === "Client") {
        console.log("u_id: ", currentUser.uid);
        // get client_id from url: api/client/getid/<u_id>
        instance
          .get(`client/getid/${currentUser.uid}`)
          .then((res) => {
            setClientID(res.data.client_id);
            console.log("ClientID: ", res.data.client_id);
            // console.log('current client id: ', clientID ); value not print out as its not stored immediately in useState
          })
          .catch((err) => {
            console.log("Error getting client_id", err);
          });
      }
    // Return a cleanup function to stop listening

    // *************************************************************************
  }, [currentUser.uid, usertype, type]); // added dependencies

  // function to load/rerender all files in table
  const load_all_data = () => {
    if (clientID !== "") {
      setLoading(true);
      console.log("Page type: ", type);
      // load all the user's files
      // let client_file_id_url = `client/file/${clientID}`
      instance
        .get(`client/file/${clientID}`) // retrieve list of files under client_id
        .then((response) => {
          console.log(response.data);

          const data = response.data; // Assuming the response contains the data you provided

          const data_list = data.map((entry) => ({
            id: entry.file_id,
            fileName: entry.filename,
            userName: entry.client,
            timeStamp: entry.last_change,
            fileSize: entry.filesize,
            fileType: entry.filetype, // for download file insert extension type
          }));
          console.log("Data_list: ", data_list);
          setData(data_list);
          // console.log("Data: ", data); it wont load in immediately
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
  };

  // load shared files
  const load_shared_files = () => {
    setLoading(true);
    console.log("Page type: ", type);
    // load all the user's files
    // let client_file_id_url = `client/file/${clientID}`
    instance
      .get(`sharedfile/toclient/${clientID}`) // retrieve files shared to client_id
      .then((response) => {
        console.log("Share response: ", response.data);

        const sharedData = response.data.results; // Assuming the response contains the data you provided

        const shared_list = sharedData.map((entry) => ({
          id: entry.file,
          fileName: entry.file__filename,
          userName: `${entry.client__u_id__f_name} ${entry.client__u_id__l_name}`,
          timeStamp: entry.create_time,
          fileType: entry.file__filetype, // for download file insert extension type
          share_id: entry.share_id, // for removing shared file
        }));
        console.log("Shared_list: ", shared_list);
        setData(shared_list);
        // console.log("Dadelete`ta: ", data); it wont load in immediately
        setLoading(false);
        console.log(
          "Shared table retrieved list of files under client",
          clientID
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // load trashed files
  const load_trashed_files = () => {
    setLoading(true);
    console.log("Page type: ", type);

    instance
      .get(`client/deleted/fileLogs/${clientID}`)
      .then((response) => {
        let trashedFilesList = response?.data || [];

        const trashed_list = trashedFilesList.map((entry) => ({
          id: entry.file_id,
          fileName: entry.filename,
          userName: entry.client_id,
          timeStamp: entry.delete_time,
          fileSize: entry.filesize,
        }));
        console.log("Trashed_list: ", trashed_list);
        setData(trashed_list);
        setLoading(false);
        console.log(
          "Trashed table retrieve list of files under client",
          clientID
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const load_all_users = () => {
    setLoading(true);
    console.log("Page type: ", type);
    // get all users from postgresql
    instance
      .get(`Users`)
      .then((res) => {
        console.log("Query all users:", res.data);
        console.log("Total users: ", res.data.length);
        let activeUsersList = res?.data || [];

        const activeUsers_list = activeUsersList.map((entry) => ({
          id: entry.u_id,
          type: entry.usertype,
          username: entry.username,
          fullname: `${entry.f_name} ${entry.l_name}`,
          email: entry.email,
          phone: entry.phone_number
        }));
        setData(activeUsers_list)
        getTotalUsers(res.data.length);
        setLoading(false);
      })
      .catch((err)=>{
        console.log("Error getting all users: ", err);
      })
  }

  useEffect(() => {
    if (usertype === "Admin") {
      console.log("Admin__ID: ", currentUser);
      switch (type) {
        case "users":
          load_all_users();
          break;
        case "files":
          load_all_data();
          break;
        case "enquiries":
          break;
        default:
          break;
      }
    } else if (usertype ==="Client") {
      console.log("Client__ID: ", clientID);
      // switch between type of table to query
      switch (type) {
        case "users":
          break;
        case "files":
          load_all_data();
          break;
        case "shared":
          load_shared_files();
          break;
        case "trash":
          load_trashed_files();
          break;
        case "enquiries":
          break;
        default:
          break;
      }
    }
    
  }, [clientID, usertype, type]);

  // upload file
  const handleUploadFiles = () => {};

  const customToolBar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <button
          class="MuiButtonBase-root MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall MuiButton-root MuiButton-text MuiButton-textPrimary MuiButton-sizeSmall MuiButton-textSizeSmall css-1knaqv7-MuiButtonBase-root-MuiButton-root"
          onClick={handleUploadFiles}
        >
          <span class="MuiButton-startIcon MuiButton-iconSizeSmall css-y6rp3m-MuiButton-startIcon">
            <FileUploadIcon />
          </span>
          Upload Files
        </button>
      </GridToolbarContainer>
    );
  };

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
            toolbar: customToolBar,
          }} // https://mui.com/x/react-data-grid/filtering/
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 25 },
            },
          }}
          pageSizeOptions={[25, 50, 100]}
          checkboxSelection
        />
      </div>
    );
  }
};

export default Datatable;
