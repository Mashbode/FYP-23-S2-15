export const userColumns = [
  { field: "id", headerName: "ID", width: 280 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    // Refer to the doc.
    // params are from data
    // valueGetter
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "birthday",
    headerName: "Birthday",
    width: 130,
  },
  {
    field: "timeStamp",
    headerName: "Registered",
    width: 130,
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
        params.row.timeStamp.toDate() // Returns Date object (Firebase)
      ).toDateString(); // Into readable string (React JS)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
];

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
      ).toDateString(); // Into readable string (React JS)
      return <div className="cellWithLastModified">{lastModifiedDate}</div>;
    },
  },
  {
    field: "enquiryStatus",
    headerName: "Status",
    width: 150,
  }
];