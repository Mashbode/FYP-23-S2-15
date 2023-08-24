export const userColumns = [
  { field: "id", headerName: "UID", width: 280 },
  {
    field: "type",
    headerName: "Type",
    width: 70 ,
    // https://mui.com/x/react-data-grid/
    // params are from rows={data} as a prop of <DataGrid></DataGrid>
    // valueGetter
    renderCell: (params) => {
      return (
        // className written on purpose to differentiate the style of admin (yellow) and user (green)
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
    width: 150,
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
    field: "fullname",
    headerName: "Full Name",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 120,
  },
  // {
  //   field: "timeStamp",
  //   headerName: "Registered",
  //   width: 140,
  //   // https://mui.com/x/react-data-grid/
  //   // params are from rows={data} as a prop of <DataGrid></DataGrid>
  // },
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
  { field: "id", headerName: "No.", width: 70 ,
    // renderCell: (params) => {
    //   let uploadTime = new Date(params.row.id).toDateString();
    //   return <div className="cellWithLastModified">{uploadTime}</div>;
    // }
  },
  {
    field: "fileName",
    headerName: "File Name",
    width: 1000,
  },
  {
    field: "userName",
    headerName: "Uploader",
    width: 150,
  },
  {
    field: "timeStamp",
    headerName: "Last Modified",
    width: 220,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        params.row.timeStamp
      ).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    }); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
  {
    field: "fileSize",
    headerName: "File size",
    width: 100,
    renderCell: (params) => {
      const bytesValue = parseInt(params.row.fileSize, 10);
      const KBValue = bytesValue / 1000;
      const MBValue = KBValue / 1000;
      const GBValue = MBValue / 1000;

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
  { field: "id", headerName: "No.", width: 70 },
  {
    field: "fileName",
    headerName: "File Name",
    width: 1000,
  },
  {
    field: "userName",
    headerName: "Shared by",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 280,
  },
  {
    field: "timeStamp",
    headerName: "Shared date",
    width: 220,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        //   params.row.timeStamp.toDate() // Returns Date object (Firebase)
        // ).toDateString(); // turns Data object into readable string (React)
        params.row.timeStamp
      ).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    }); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
];
export const sharingColumns = [
  { field: "id", headerName: "No.", width: 70 },
  {
    field: "fileName",
    headerName: "File Name",
    width: 1000,
  },
  {
    field: "userName",
    headerName: "Shared to",
    width: 250,
  },
  {
    field: "email",
    headerName: "Email",
    width: 280,
  },
  {
    field: "timeStamp",
    headerName: "Shared date",
    width: 220,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        //   params.row.timeStamp.toDate() // Returns Date object (Firebase)
        // ).toDateString(); // turns Data object into readable string (React)
        params.row.timeStamp
      ).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    }); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
];
// *************************************************************************

// ************************** Connect with Django **************************
// Change the field according to the data fetched from Datatabls.jsx -> useEffect()
export const trashColumns = [
  { field: "id", headerName: "No.", width: 70 },
  {
    field: "fileName",
    headerName: "File Name",
    width: 1000,
  },
  // {
  //   field: "userName",
  //   headerName: "Uploader",
  //   width: 230,
  // },
  {
    field: "timeStamp",
    headerName: "Trashed Date",
    width: 220,
    renderCell: (params) => {
      let lastModifiedDate = new Date(
        //   params.row.timeStamp.toDate() // Returns Date object (Firebase)
        // ).toDateString(); // turns Data object into readable string (React)
        params.row.timeStamp
      ).toLocaleString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit', 
        hour12: false 
    }); // turns Data object into readable string (React)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
  {
    field: "fileSize",
    headerName: "File size",
    width: 100,
    renderCell: (params) => {
      const bytesValue = parseInt(params.row.fileSize, 10);
      const KBValue = bytesValue / 1000;
      const MBValue = KBValue / 1000;
      const GBValue = MBValue / 1000;

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
    field: "text",
    headerName: "Text",
    width: 1200,
  },
  {
    field: "email",
    headerName: "Email",
    Width: 250,
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
];
