import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/chart/Chart";
import List from "../../components/table/Table";
import Pie from "../../components/chart/pie/Pie";
import FileManager from "../../components/filemananger/FileManager";

import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const Single = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(collection(db, "users"));
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

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

  const handleStorageIncrease = () => {};
  const handleStorageDecrease = () => {};

  return (
    <div className="single">
      <Toaster toastOptions={{ duration: 2000 }} />
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <Link to="/users/edit" style={{ textDecoration: "none" }}>
              <div className="editButton">Edit</div>
            </Link>
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
                  <span className="itemKey">Username:</span>
                  <span className="itemValue">jane1</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">jane1@gmail.com</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Registered Date:</span>
                  <span className="itemValue">01 Jan 2023</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">+65 8888 9999</span>
                </div>
              </div>
              <div className="deleteButton" onClick={handleUserDelete}>
                Delete Account
              </div>
            </div>
          </div>
          <div className="right">
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
          <FileManager title="Files" />
        </div>
      </div>
    </div>
  );
};

export default Single;
