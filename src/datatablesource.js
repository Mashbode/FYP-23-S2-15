export const userColumns = [
  { field: "id", headerName: "ID", width: 280 },
  {
    field: "type",
    headerName: "Type",
    width: 110,
    // https://mui.com/x/react-data-grid/
    // params are from rows={data} as a prop of <DataGrid></DataGrid>
    // valueGetter
    renderCell: (params) => {
      return (
        // className written on purpose to differentiat the style of admin (yellow) and user (green)
        <div className={`cellWithType ${params.row.type}`}>
          {/* First letter of the user type will be changed to upper case */}
          {params.row.type.replace(/^./, params.row.type[0].toUpperCase())}
        </div>
      );
    },
  },
  {
    field: "username",
    headerName: "Username",
    width: 130,
    // https://mui.com/x/react-data-grid/
    // params are from rows={data} as a prop of <DataGrid></DataGrid>
    // valueGetter
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.img} alt="avatar" />
    //       {params.row.username}
    //     </div>
    //   );
    // },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 130,
  },
  {
    field: "timeStamp",
    headerName: "Registered",
    width: 140,
    // https://mui.com/x/react-data-grid/
    // params are from rows={data} as a prop of <DataGrid></DataGrid>
    // valueGetter
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        params.row.timeStamp.toDate() // Returns Date object (Firebase)
      ).toDateString(); // Into readable string (React JS)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 160,
  //   renderCell: (params) => {
  //     return (
  //       <div className={`cellWithStatus ${params.row.status}`}>
  //         {params.row.status}
  //       </div>
  //     );
  //   },
  // },
];

// ************************** Connect with Django **************************
// Change the field according to the data fetched from Datatabls.jsx -> useEffect()
export const fileColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "filename",
    headerName: "File Name",
    width: 300,
  },
  {
    field: "username",
    headerName: "Uploader",
    width: 230,
  },

  {
    field: "timeStamp",
    headerName: "Last Modified",
    width: 150,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        //   params.row.timeStamp.toDate() // Returns Date object (Firebase)
        // ).toDateString(); // turns Data object into readable string (React)
        params.row.timeStamp
      ).toDateString(); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
];
// *************************************************************************

// ************************** Connect with Django **************************
// Change the field according to the data fetched from Datatabls.jsx -> useEffect()
export const sharedColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "filename",
    headerName: "File Name",
    width: 300,
  },
  {
    field: "username",
    headerName: "Uploader",
    width: 230,
  },

  {
    field: "timeStamp",
    headerName: "Last Modified",
    width: 150,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        //   params.row.timeStamp.toDate() // Returns Date object (Firebase)
        // ).toDateString(); // turns Data object into readable string (React)
        params.row.timeStamp
      ).toDateString(); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
];
// *************************************************************************

// ************************** Connect with Django **************************
// Change the field according to the data fetched from Datatabls.jsx -> useEffect()
export const trashColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "filename",
    headerName: "File Name",
    width: 300,
  },
  {
    field: "username",
    headerName: "Uploader",
    width: 230,
  },

  {
    field: "timeStamp",
    headerName: "Last Modified",
    width: 150,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        //   params.row.timeStamp.toDate() // Returns Date object (Firebase)
        // ).toDateString(); // turns Data object into readable string (React)
        params.row.timeStamp
      ).toDateString(); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
];
// *************************************************************************

export const enquiryColumns = [
  { field: "id", headerName: "ID", width: 100 },
  {
    field: "enquiryTitle",
    headerName: "Enquiry Title",
    width: 350,
  },
  {
    field: "name",
    headerName: "Enquirer",
    width: 150,
  },
  {
    field: "timeStamp",
    headerName: "Last Modified",
    width: 150,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        params.row.timeStamp.toDate() // Returns Date object (Firebase)
      ).toDateString(); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
  {
    field: "enquiryStatus",
    headerName: "Status",
    width: 150,
  },
];
