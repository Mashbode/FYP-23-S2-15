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
  { field: "id", headerName: "File ID", width: 250 },
  {
    field: "fileName",
    headerName: "File Name",
    width: 300,
  },
  {
    field: "userName",
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
  {
    field: "fileSize",
    headerName: "File size",
    width: 100,
    renderCell: (params) => {
      const bytesValue = parseInt(params.row.fileSize, 10);
      const KBValue = bytesValue / 1024;
      const MBValue = KBValue / 1024;
      const GBValue = MBValue / 1024;

      if (GBValue >= 1) {
        return (
          <div className="cellWithFileSize">{GBValue.toFixed(2) + " GB"}</div>
        );
      } else if (MBValue >= 1) {
        return (
          <div className="cellWithFileSize">{MBValue.toFixed(2) + " MB"}</div>
        );
      } else {
        return (
          <div className="cellWithFileSize">{Math.ceil(KBValue) + " KB"}</div>
        );
      }
    },
  },
];
// *************************************************************************

// ************************** Connect with Django **************************
// Change the field according to the data fetched from Datatabls.jsx -> useEffect()
export const sharedColumns = [
  { field: "id", headerName: "File ID", width: 250 },
  {
    field: "fileName",
    headerName: "File Name",
    width: 300,
  },
  {
    field: "userName",
    headerName: "Shared by",
    width: 230,
  },
  {
    field: "timeStamp",
    headerName: "Shared date",
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
  { field: "id", headerName: "File ID", width: 250 },
  {
    field: "fileName",
    headerName: "File Name",
    width: 300,
  },
  {
    field: "userName",
    headerName: "Uploader",
    width: 230,
  },
  {
    field: "timeStamp",
    headerName: "Trashed Date",
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
  {
    field: "fileSize",
    headerName: "File size",
    width: 100,
    renderCell: (params) => {
      const bytesValue = parseInt(params.row.fileSize, 10);
      const KBValue = bytesValue / 1024;
      const MBValue = KBValue / 1024;
      const GBValue = MBValue / 1024;

      if (GBValue >= 1) {
        return (
          <div className="cellWithFileSize">{GBValue.toFixed(2) + " GB"}</div>
        );
      } else if (MBValue >= 1) {
        return (
          <div className="cellWithFileSize">{MBValue.toFixed(2) + " MB"}</div>
        );
      } else {
        return (
          <div className="cellWithFileSize">{Math.ceil(KBValue) + " KB"}</div>
        );
      }
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
