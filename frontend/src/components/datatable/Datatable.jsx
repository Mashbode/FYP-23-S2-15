import "./datatable.scss";
import {
  DataGrid,
  // GridColDef, GridValueGetterParams
} from "@mui/x-data-grid";

import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase";
import {
  userColumns,
  fileColumns,
  sharedFileColumns,
  deletedFileColumns,
  enquiryColumns,
} from "../../datatablesource";

const userRows = [
  {
    id: 1,
    username: "Snow",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    status: "active",
    email: "1snow@gmail.com",
    age: 35,
  },
  {
    id: 2,
    username: "Jamie Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "2snow@gmail.com",
    status: "passive",
    age: 42,
  },
  {
    id: 3,
    username: "Lannister",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "3snow@gmail.com",
    status: "pending",
    age: 45,
  },
  {
    id: 4,
    username: "Stark",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "4snow@gmail.com",
    status: "active",
    age: 16,
  },
  {
    id: 5,
    username: "Targaryen",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "5snow@gmail.com",
    status: "passive",
    age: 22,
  },
  {
    id: 6,
    username: "Melisandre",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "6snow@gmail.com",
    status: "active",
    age: 15,
  },
  {
    id: 7,
    username: "Clifford",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "7snow@gmail.com",
    status: "passive",
    age: 44,
  },
  {
    id: 8,
    username: "Frances",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "8snow@gmail.com",
    status: "active",
    age: 36,
  },
  {
    id: 9,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "pending",
    age: 65,
  },
  {
    id: 10,
    username: "Roxie",
    img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
    email: "snow@gmail.com",
    status: "active",
    age: 65,
  },
];

// Pass type prop if u want to apply it to both users & products
const Datatable = ({ type }) => {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  const handleUserDelete = async (id) => {
    try {
      if (window.confirm("Are you sure to delete the user?")) {
        // db, collection, id
        await deleteDoc(doc(db, "users", id));
        setData(data.filter((item) => item.id !== id)); // If used on its own, when refreshed the data is not deleted
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileDelete = async (params) => {
    try {
      if (window.confirm("Are you sure to delete the file?")) {
        // Delete the document
        // db, collection, id
        await deleteDoc(doc(db, "files", params.row.id));

        // Delete the file inside storage
        const name = `${currentUser.uid}_files/${params.row.filename}`;
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
    } catch (error) {}
  };

  // https://firebase.google.com/docs/storage/web/download-files#download_data_via_url
  // https://firebase.google.com/docs/storage/web/download-files#cors_configuration
  // Second Answer - https://stackoverflow.com/questions/37760695/firebase-storage-and-access-control-allow-origin
  // your-cloud-bucket - https://console.cloud.google.com/storage/browser?project=tutorial-40ef8
  // const handleFileDownload = (params) => {
  //   console.log(`${params.row.id}_files/${params.row.filename}`);

  //   try {
  //     // getBlob(ref(storage, `${params.row.id}_files/${params.row.filename}`));
  //     getBlob(ref(storage, "nOAIz1YPkoOhfuGPJ4WgKirns032_files/notes.txt"));
  //     // const xhr = new XMLHttpRequest();
  //     // xhr.responseType = "blob";
  //     // xhr.onload = (event) => {
  //     //   const blob = xhr.response;
  //     // };
  //     // xhr.open("GET", url);
  //     // xhr.send();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // This will be concat to columns below
  const actionUserColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
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

  // This will be concat to columns below
  const actionFileColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/files/test" style={{ textDecoration: "none" }}>
              <div className="firstActionButton">Download</div>
            </Link> */}
            <a href={params.row.file} className="firstActionButton" download>
              Download
            </a>
            {/* <div
              className="firstActionButton"
              onClick={() => handleFileDownload(params)}
            >
              Download
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

  const actionEnquiryColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
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

  const actionSharedFileColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 400,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/files/test" style={{ textDecoration: "none" }}>
              <div className="firstActionButton">Download</div>
            </Link> */}
            <a href={params.row.file} className="firstActionButton" download>
              Download
            </a>
            <div
              className="firstActionButton"
              // onClick={() => }
            >
              Manage Sharing
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

  const actionDeletedFileColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* <Link to="/files/test" style={{ textDecoration: "none" }}>
              <div className="firstActionButton">Download</div>
            </Link> */}
            {/* <a href={params.row.file} className="firstActionButton" download>
              Download
            </a> */}
            <div
              className="firstActionButton"
              // onClick={() => handleFileDownload(params)}
            >
              Restore
            </div>
            <div
              className="deleteButton"
              onClick={() => handleFileDelete(params)}
            >
              Permanetly Delete
            </div>
          </div>
        );
      },
    },
  ];

  let columns;
  let actionColumn;
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
      columns = sharedFileColumns;
      actionColumn = actionSharedFileColumn;
      break;
    case "trash":
      columns = deletedFileColumns;
      actionColumn = actionDeletedFileColumn;
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
    const fetchData = async () => {
      let list = [];
      try {
        // DB and collection name
        const querySnapshot = await getDocs(collection(db, type));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();

    // // Listen to data real-time + SF id is not required + doc chnged to snapShot
    // const unsub = onSnapshot(collection(db, "users"), (snapShot) => {
    //   let list = [];
    //   // console.log("Current data: ", doc.data());
    //   // Refer upper querySnapshot
    //   snapShot.docs.forEach(
    //     (doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //       setData(list);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
    // });
    // // Return a cleanup function to stop listening
    // return () => {
    //   unsub();
    // };
  }, []);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {type.replace(/^./, type[0].toUpperCase())}
        {/* <Link to={`/${type}/new`} className="link"> */}
        <Link
          to={`/${type}/new`}
          // Add New button to add new user is disabled as of now
          className={type === "users" ? "link user" : "link"}
        >
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        // rows={userRows}
        rows={data}
        // columns={userColumns.concat(actionColumn)}
        columns={columns.concat(actionColumn)}
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
