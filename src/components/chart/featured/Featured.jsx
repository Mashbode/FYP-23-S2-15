import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css"; // RMB TO IMPORT
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useContext , useEffect, useState } from 'react';
import instance from "../../../axios_config";
import {auth} from "../../../firebase";
import { AuthContext } from "../../../context/AuthContext";

const Featured = () => {
  const maxFileStorageSize = 19327352832; // 18000000000 = 18GB // (both in bytes) // 19327352832 = 18GiB
  const [ fileStorage_Limit, setFileStorageLimit] = useState(1000000000); // FREETIER 1000000000 1073741824
  const [ convert_storage_limit, convert_StorageLimit] = useState();
  const [converted_maxStorage_Admin, convert_StorageLimit_Admin] = useState();
  const { currentUser } = useContext(AuthContext);
  const [ usertype, setUsertype ] = useState(""); // get usertype (implement for client and admin)
  const [ amount, setAmount ] = useState(``);
  const [ totalUser , setTotalUser ] = useState();
  const [ diff, setDiff ] = useState(null);
  const [ percentile_used, setPercentile_used ] = useState();
  const [ storageLeft, setStorageLeft ] = useState();
  const [ clientID, getClientID ] = useState();


  // // check usertype when page loads
  useEffect (()=>{
    // get user type

    const fetchUserType = async () => {
      let user_type = "";
      await instance.get(`${currentUser.uid}`)
        .then((res)=> {
          if(res.data.usertype !== null) {
            setUsertype(res.data.usertype); // setState will not save data immediately
            user_type = res.data.usertype; // to store within useEffect
          }
          console.log("Feature Usertype: ",res.data.usertype);
        })
        .catch((err)=> {
          console.log("Error getting usertype: ", err);
        });
        console.log("Feature user_type: ", user_type);
    }

    fetchUserType();
  }, []);

  useEffect(() => {
    const getTotalData = async () => {
      // Function to fetch storage-related data
      if (usertype === "Client") {
        // GET CLIENT_ID FIRST
        const cid = await instance.get(`client/getid/${currentUser.uid}`)
        getClientID(cid.data.client_id);
        var client_id = cid.data.client_id;
        console.log("Client ID: ", client_id);

        const getClientStorageData = async () => {
          const res = await instance.get(`client/filestorage/used/${client_id}`);
          const total_files_stored = res.data.result.filesize__sum;
          console.log("Total Files stored by client: ", total_files_stored);
          
          const percentile = (total_files_stored / fileStorage_Limit ) * 100; // By Default 1GB per user
          setPercentile_used(percentile.toFixed(2));
          const storage_Left = fileStorage_Limit - total_files_stored;
          console.log("Storage left in client: ", storage_Left);
          return { total_files_stored, storage_Left, fileStorage_Limit };
        };

        // Function to convert bytes to human-readable sizes
        const convertSize = (value) => {
          const sizes = ['B', 'KB', 'MB', 'GB'];
          let index = 0;
          while (value >= 1024 && index < sizes.length - 1) {
            value /= 1024;
            index++;
          }
          return `${value.toFixed(2)}${sizes[index]}`;
        };
    
        // Fetch storage-related data
        const { total_files_stored, storage_Left } = await getClientStorageData();
    
        // Set converted storage amount and storage left
        setAmount(convertSize(total_files_stored));
        setStorageLeft(convertSize(storage_Left));
        convert_StorageLimit(convertSize(fileStorage_Limit));
    
        // Fetch total number of files uploaded by client
        const rs = await instance.get(`client/countfiles/${client_id}`);
        const total_files = rs.data.result;
        console.log("Total files in server: ", total_files);
      } 
      else if (usertype === "Admin") {
        const getStorageData = async () => {
          const res = await instance.get(`admin/total/storage`);
          const total_files_stored = res.data.result.filesize__sum;
          // total files size in file system / max storage size * 100
          const percentage = (total_files_stored / maxFileStorageSize) * 100;
          setPercentile_used(percentage.toFixed(2));
    
          const storage_Left = maxFileStorageSize - total_files_stored;
          return { total_files_stored, storage_Left, maxFileStorageSize };
        };
    
        // Function to convert bytes to human-readable sizes
        const convertSize = (value) => {
          const sizes = ['B', 'KB', 'MB', 'GB'];
          let index = 0;
          while (value >= 1024 && index < sizes.length - 1) {
            value /= 1024;
            index++;
          }
          return `${value.toFixed(2)}${sizes[index]}`;
        };
    
        // Fetch storage-related data
        const { total_files_stored, storage_Left } = await getStorageData();
    
        // Set converted storage amount and storage left
        setAmount(convertSize(total_files_stored));
        setStorageLeft(convertSize(storage_Left));
        convert_StorageLimit_Admin(convertSize(maxFileStorageSize));
    
        // Fetch total number of files uploaded by all users
        const rs = await instance.get(`count/client`);
        const total_files = rs.data.result;
        console.log("Total files in server: ", total_files);
      }
    };
  
    // Initial data retrieval
    getTotalData();
  }, [usertype, currentUser.uid, fileStorage_Limit]);
  
  

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">File Storage Capacity</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        {/* Was gg to use pure svg -> lib */}
        <div className="featuredChart">
          {/* strokeWidth is to make the bar thin */}
          <CircularProgressbar value={percentile_used} text={percentile_used + "%"} strokeWidth={5} />
        </div>
        <p className="title"> Total File Size Uploaded </p>
        <p className="amount">{ amount }</p>
        <p className="desc">
          Previous uploads processing. Last reading may not be included.
        </p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Max Capacity</div>
            <div className="itemResult negative">             
              <div className="resultAmount">{usertype === "Client" ? (convert_storage_limit) : (converted_maxStorage_Admin)}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Server RAM</div>
            <div className="itemResult neutral">
              <div className="resultAmount">1GB</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Storage Left</div>
            <div className="itemResult positive">
              <div className="resultAmount">{ storageLeft }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
