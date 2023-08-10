import "./datatable.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { toast, Toaster } from "react-hot-toast";

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  // getDocs,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  userColumns,
  fileColumns,
  enquiryColumns,
} from "../../datatablesource";

// Pass type prop if u want to apply it to both users & products
const Datatable = ({ type }) => {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

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

  // const handleFileDelete = async (params) => {
  //   try {
  //     if (window.confirm("Are you sure to delete the file?")) {
  //       // Delete the document
  //       await deleteDoc(doc(db, "files", params.row.id)); // doc(db, collection, id)

  //       // Delete the file inside storage
  //       const name = `${currentUser.uid}_files/${params.row.filename}`;
  //       const storageRef = ref(storage, name);

  //       // Delete the file
  //       deleteObject(storageRef)
  //         .then(() => {
  //           console.log("File deleted successfully");
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       setData(data.filter((item) => item.id !== params.row.id)); // If used on its own, when refreshed the data is not deleted
  //     } else {
  //       return;
  //     }
  //   } catch (error) {}
  // };

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
              <div className="firstActionButton">View</div>
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

  // const actionFileColumn = [
  //   {
  //     field: "action",
  //     headerName: "Action",
  //     width: 200,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellAction">
  //           {/* <Link to="/files/test" style={{ textDecoration: "none" }}>
  //             <div className="firstActionButton">Download</div>
  //           </Link> */}
  //           <a href={params.row.file} className="firstActionButton" download>
  //             Download
  //           </a>
  //           {/* <div
  //             className="firstActionButton"
  //             onClick={() => handleFileDownload(params)}
  //           >
  //             Download
  //           </div> */}
  //           <div
  //             className="deleteButton"
  //             onClick={() => handleFileDelete(params)}
  //           >
  //             Delete
  //           </div>
  //         </div>
  //       );
  //     },
  //   },
  // ];

  const actionEnquiryColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/profile" style={{ textDecoration: "none" }}>
              <div className="firstActionButton">Reply</div>
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
      actionColumn = [];
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
    // const fetchData = async () => {
    //   var list = [];
    //   try {
    //     // DB and collection name
    //     const querySnapshot = await getDocs(collection(db, type));
    //     querySnapshot.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       // console.log(doc.id, " => ", doc.data());
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // ************************** Connect with Django **************************
    // https://firebase.google.com/docs/firestore/query-data/listen
    // Listen to data real-time + doc id is not required + doc chnged to snapShot
    const unsub = onSnapshot(collection(db, "users"), (snapShot) => {
      var list = [];
      // console.log("Current data: ", doc.data());
      // Refer upper querySnapshot
      snapShot.docs.forEach(
        (doc) => {
          list.push({ id: doc.id, ...doc.data() });
          setData(list);
        },
        (error) => {
          console.log(error);
        }
      );
    });

    // Return a cleanup function to stop listening
    return () => {
      unsub();
    };
    // *************************************************************************
  }, []);

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
};

export default Datatable;
