import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";


import React, { useState, useEffect } from 'react';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Edit = () => {
  const [user, setUser] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [registeredDate, setRegisteredDate] = useState('');
  const navigate = useNavigate();

  const [file, setFile] = useState("");

  // Function to fetch the authenticated user's data from Firestore
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
          setFirstName(userDoc.data().firstName);
          setLastName(userDoc.data().lastName);
          setUsername(userDoc.data().username);
          setEmail(userDoc.data().email);
          setPhoneNumber(userDoc.data().phone);
          setRegisteredDate(userDoc.data().timeStamp);
        }
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);
        await updateDoc(userRef, {
          firstName,
          lastName,
          username,
          email,
          phone,
        });

        // Update password if provided
        if (password) {
          await user.updatePassword(password);
        }

        console.log('User information updated successfully!');
        // Clear the password field after submitting
        setPassword('');
      }

    // go back to previous pg after updating
    //   navigate(-1);
    } catch (error) {
      console.error('Error updating user information:', error);
    }
  };

  const handleCancelClick = () => {
    // Navigate to the previous page using the navigate function with -1 as the argument
    navigate(-1);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Profile</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img 
              src={
                file // Img file existing boolean
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
            <div className="formInput">
              <label htmlFor="file">
                Upload Profile Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file" // label htmlFor="file" and this input is connected
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
             </div>
          </div>
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="rightContainer">
                <div className="formInput">
                  <div>
                    <label>First Name:</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label>Last Name:</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div>
                      <label>Username:</label>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="updateButton">
                    <button type="submit">Update</button>
                  </div>
                </div>
              </div>
              <div className="rightContainer">
                <div className="formInput">
                  <div>
                      <label>Email:</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div>
                      <label>Phone Number:</label>
                      <input type="text" value={phone} onChange={(e) => setPhoneNumber(e.target.value)} />
                  </div>
                  <div>
                      <label>New Password:</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
