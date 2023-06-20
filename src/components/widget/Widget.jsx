import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

const Widget = ({ type }) => {
  // // temporary fake data
  // const amount = 100;
  // const diff = 20; // percentage

  const [amount, setAmount] = useState(null);
  const [diff, setDiff] = useState(null);

  let data;

  useEffect(() => {
    const fetchData = async () => {
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
      const prevMonthData = await getDocs(prevMonthQuery);

      setAmount(lastMonthData.docs.length);
      setDiff(
        ((lastMonthData.docs.length - prevMonthData.docs.length) /
          prevMonthData.docs.length) *
          100
      );
    };

    fetchData();
  }, []);

  // Its also ok to do it by making source like datatablesource.js
  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
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
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "product":
      data = {
        title: "PRODUCTS",
        // isMoney: true,
        link: "See details",
        query: "products",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    // case "balance":
    //   data = {
    //     title: "BALANCE",
    //     isMoney: true,
    //     link: "See details",
    //     icon: (
    //       <AccountBalanceWalletOutlinedIcon
    //         className="icon"
    //         style={{
    //           backgroundColor: "rgba(128, 0, 128, 0.2)",
    //           color: "purple",
    //         }}
    //       />
    //     ),
    //   };
    //   break;
    default:
      break;
  }
  return (
    <div className="widget">
      <div className="left">
        <div className="title">{data.title}</div>
        <div className="counter">
          {data.isMoney && "$"} {amount}
        </div>
        <div className="link">{data.link}</div>
      </div>
      <div className="right">
        <div className={`percentage ${diff > 0 ? "positive" : "negative"}`}>
          {diff > 0 ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
