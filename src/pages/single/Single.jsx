import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/chart/Chart";
import List from "../../components/table/Table";
<<<<<<< HEAD
=======
import Pie from "../../components/chart/pie/Pie";
import Datatable from "../../components/datatable/Datatable"
>>>>>>> main

import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

import { toast, Toaster } from "react-hot-toast";

<<<<<<< HEAD
const Single = () => {
=======
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";

import { Link } from "react-router-dom";

const Single = () => {
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    };

    getUsers();
  }, []);

>>>>>>> main
  const { dispatch } = useContext(AuthContext);

  const handleUserDelete = async () => {
    if (window.confirm("Are you sure to delete?")) {
      const user = JSON.parse(localStorage.getItem("user")); // Getting a user from local storage
      console.log(user);
      console.log(user.uid);

      // // db, collection, id
      await updateDoc(doc(db, "users", user.uid), {
        status: "deleted",
      })
        .then(() => {
          // User deleted.
          toast.success("Your account deleted successfully!");
          setTimeout(() => {
            dispatch({ type: "LOGOUT" });
          }, 2000);
        })
        .catch((error) => {
          // An error ocurred
          toast.error(`Contact admin: ${error.code}`);
        });
      // await deleteUser(user)
      //   .then(() => {
      //     // User deleted.
      //     toast.success("Your account deleted successfully!");
      //   })
      //   .catch((error) => {
      //     // An error ocurred
      //     toast.error(`Contact admin: ${error.code}`);
      //   });
    } else {
      return;
    }
  };
<<<<<<< HEAD
=======
  const handleStorageIncrease = async () => {
    
  }
>>>>>>> main

  return (
    <div className="single">
      <Toaster toastOptions={{ duration: 2000 }} />
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
<<<<<<< HEAD
            <div className="editButton">Edit</div>
=======
            <Link to="/users/edit" style={{ textDecoration: "none" }}>
              <div className="editButton">Edit</div>
            </Link>
>>>>>>> main
            <h1 className="title">Information</h1>
            {/* Not gg to use users as a class name -> item would be more general */}
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">Jane Doe</h1>
                <div className="detailItem">
<<<<<<< HEAD
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">janedoe@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+1 2345 67 89</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    Elton St. 234 Garden Yd. NewYork
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">USA</span>
                </div>
=======
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">jane1</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">jane1@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered Date:</span>
                  <span className="itemValue">
                    01 Jan 2023
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+65 8888 9999</span>
                </div>
                {/* <div className="detailItem">
                  <span className="itemKey">Birthday:</span>
                  <span className="itemValue">01 Jan 1990</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">1 Main Street Singapore 123456</span>
                </div> */}
>>>>>>> main
              </div>
            </div>
            <div className="deleteButton" onClick={handleUserDelete}>
              Delete Account
            </div>
          </div>
          <div className="right">
<<<<<<< HEAD
            <Chart aspect={3 / 1} title={"User Spending (Last 6 Months)"} />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transactions</h1>
          <List />
=======
            {/* <Chart aspect={3 / 1} title={"Storage Usage"} /> */}
            <h1 className="title">Storage Usage</h1>
            <Pie />
            <div className="increaseButton" onClick={handleStorageIncrease}>
              Increase Storage
            </div>
            <div className="decreaseButton" onClick={handleStorageDecrease}>
              Decrease Storage
            </div>
          </div>
        </div>
        <div className="bottom">
          {/* <h1 className="title">Files</h1>
          <List /> */}
          <Datatable type={"files"} /> {}
>>>>>>> main
        </div>
      </div>
    </div>
  );
};

export default Single;
