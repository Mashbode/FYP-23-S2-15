import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState, useContext } from "react";
import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import instance from "../../axios_config";

const Widget = ({ type }) => {
  const [ usertype, setUsertype ] = useState(""); // get usertype (implement for client and admin)
  const [amount, setAmount] = useState(null);
  const [ totalUser , setTotalUser ] = useState();
  const [diff, setDiff] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [ clientID, getClientID ]= useState();

  let data;

    // // check usertype when page loads
    useEffect (() => {

      // get user type
      const fetchUserType = async () => {
        let user_type = "";
        await instance.get(`/${currentUser.uid}`)
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
      }
  
      fetchUserType();
    }, [currentUser.uid]);

  useEffect(() => {

    const totality = async () => {

        if(usertype === "Client") {
          // GET CLIENT_ID FIRST
          const cid = await instance.get(`client/getid/${currentUser.uid}`)
          getClientID(cid.data.client_id);
          var client_id = cid.data.client_id;
          console.log("Client ID: ", client_id);

        if (data.query === "users") {
          const response = await instance.get(`client/countsharedto/${client_id}`);
          const total_result = response.data.result;
          console.log("Total files shared: ", total_result);
          setAmount(total_result);
        }
        if (data.query === "share") {
          const response = await instance.get(`client/countshared/${client_id}`);
          const total_files_shared_by_client = response.data.result;
          console.log("Total files shared by client: ", total_files_shared_by_client);
          setAmount(total_files_shared_by_client);
        }
        if (data.query === "files") {
          const response = await instance.get(`client/countfiles/${client_id}`);
          const total_files_client = response.data.result;
          console.log("Total files client own: ", total_files_client);
          setAmount(total_files_client);
        }
      } 
      else if(usertype ==="Admin") {
        const today = new Date();
        const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
        const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2)); // Two months ago

        const lastMonthQuery = query(
          collection(db, data.query),
          where("timeStamp", "<=", today),
          where("timeStamp", ">", lastMonth)
        );

        const prevMonthQuery = query(
          collection(db, data.query),
          where("timeStamp", "<=", lastMonth),
          where("timeStamp", ">", prevMonth)
        );

        const lastMonthData = await getDocs(lastMonthQuery);
        console.log("Lastmon: ",lastMonthData.docs.length);
        const prevMonthData = await getDocs(prevMonthQuery);
        // if last last month <= 0, set increase to last month users
        if (prevMonthData.docs.length <= 0 ) {
          setDiff(lastMonthData.docs.length);
        } else {
          console.log("Prevmon:", prevMonthData.docs.length);     
          setDiff(
            ((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100
          );
          console.log("Difference: ", (((lastMonthData.docs.length - prevMonthData.docs.length) / prevMonthData.docs.length) * 100).toFixed(2) )
        }

        // firebase db is called users so need to put condition query client table in postgresql
        if (data.query === "users") {
          const response = await instance.get(`count/client`);
          const total_result = response.data.result;
          setAmount(total_result);
        } 
        // total shared files throughout server
        else if ( data.query === "share") {
          const response = await instance.get(`admin/total/${data.query}`);
          const total_result = response.data.result;
          console.log("Total files shared: ", total_result);
          setAmount(total_result);
        }
        // total files in server
        else {
          const response = await instance.get(`count/${data.query}`);
          const total_result = response.data.result;
          console.log("Total files in server: ", total_result);
          setAmount(total_result);
        }
      }
      
    }

    totality();
  }, [clientID, currentUser.uid, usertype]);

  // Its also ok to do it by making source like datatablesource.js
  switch (type) {
    case "users":
      data = {
        title: "TOTAL USERS",
        isMoney: false,
        link: "Existing",
        query: "users",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "files":
      data = {
        title: "TOTAL FILES SERVERS HOLDING",
        isMoney: false,
        link: "Distributed File System",
        query: "files",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    case "share":
      data = {
        title: "TOTAL FILES SHARED",
        isMoney: false,
        link: "Secure File Sharing",
        query: "share",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  if(usertype === "Client") {
    return (
      <div className="widget">
        <div className="left">
          <div className="title">{data.title === "TOTAL USERS" ? ("TOTAL FILES SHARING") : (data.title)}</div>
          <div className="counter">
            {data.isMoney && "$"} { amount }
          </div>
          <div className="link">{data.link}</div>
        </div>
        {data.query === "users" ? (
          <div className="right">
          <div className={`percentage ${amount > 0 ? "positive" : "negative"}`}>
            ._.
          </div>
          {data.icon}
        </div>
        ) : (
          <div className="right">
          <div className={`percentage ${amount > 0 ? "positive" : "negative"}`}>
            ._.
          </div>
          {data.icon}
          </div>
        )}  
      </div>
    );
  } else {
    return (
      <div className="widget">
        <div className="left">
          <div className="title">{data.title}</div>
          <div className="counter">
            {data.isMoney && "$"} { amount }
          </div>
          <div className="link">{data.link}</div>
        </div>
        {data.query === "users" ? (
          <div className="right">
          <div className={`percentage ${diff > 0 ? "positive" : "negative"}`}>
            {diff > 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            {diff}% (compared to previous month)
          </div>
          {data.icon}
        </div>
        ) : (
          <div className="right">
          <div className={`percentage ${amount > 0 ? "positive" : "negative"}`}>
            ._.
          </div>
          {data.icon}
          </div>
        )}  
      </div>
    );
  }
};

export default Widget;
