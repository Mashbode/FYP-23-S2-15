import "./edit.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import FormInput from "../../components/forminput/FormInput";
import PhoneInput from "react-phone-input-2";
import CircularProgress from "@mui/material/CircularProgress";

// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

import React, { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const user = auth.currentUser;
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    // email: "",
    phone: "",
    newPassword: "",
    confirmNewPassword: "",
  }); // Handle multiple input at once
  const [registering, setRegistering] = useState(false); // Spinner icon
  const [errorMsg, setErrorMsg] = useState(""); // Error msg on register

  const formInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      value: values.username,
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true, // When tried to submit with invalid input, it prevents submission
    },
    {
      id: 2,
      name: "firstName",
      type: "text",
      value: values.firstName,
      errorMessage:
        "Last name should be 1-32 characters and shouldn't include any special character or number!",
      label: "First name",
      pattern: "^[A-Za-z]{1,32}$",
      required: true, // When tried to submit with invalid input, it prevents submission
    },
    {
      id: 3,
      name: "lastName",
      type: "text",
      value: values.lastName,
      errorMessage:
        "Last name should be 1-32 characters and shouldn't include any special character or number!",
      label: "Last Name",
      pattern: "^[A-Za-z]{1,32}$",
      required: true, // When tried to submit with invalid input, it prevents submission
    },
    // {
    //   id: 4,
    //   name: "email",
    //   type: "email",
    //   value: values.email,
    //   errorMessage: "It should be a valid email address!",
    //   label: "Email",
    //   required: true,
    // },
    {
      id: 4,
      name: "newPassword",
      type: "password",
      placeholder: "New Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "New Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmNewPassword",
      type: "password",
      placeholder: "Confirm New Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm New Password",
      pattern: values.password,
      required: true,
    },
  ];

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // Function to fetch the authenticated user's data from Firestore
  const fetchUserData = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setValues({
            username: userDoc.data().username,
            firstName: userDoc.data().firstName,
            lastName: userDoc.data().lastName,
            // email: userDoc.data().email,
            phone: userDoc.data().phone,
          });
        }
      }

      setRegistering(false);
    } catch (error) {
      setErrorMsg(`Contact admin: ${error.code}`);
      // switch (error.code) {
      //   case "auth/email-already-in-use":
      //     setErrorMsg("Provided email is already in use!");
      //     break;
      //   default: // All the other errors
      //     setErrorMsg(`Contact admin: ${error.code}`);
      //     break;
      // }

      setRegistering(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit
    setRegistering(true);

    try {
      const { username, firstName, lastName, phone, newPassword } = values;

      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          username: username,
          firstName: firstName,
          lastName: lastName,
          // email: email,
          phone: "+" + phone, // "+" is required in order to reflect country code
        });

        // Update password if provided
        if (newPassword) {
          updatePassword(user, newPassword)
            .then(() => {
              // Update successful.
              // go back to previous pg after updating
              navigate(-1);
            })
            .catch((error) => {
              // An error ocurred
              console.log(error);
            });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="edit">
      <Sidebar />
      <div className="editContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Profile</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
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
                Upload Profile Image:{" "}
                <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file" // label htmlFor="file" and this input is connected
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
          </div> */}
          {/* <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="rightContainer">
                <div className="formInput">
                  <div>
                    <label>First Name:</label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Last Name:</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Username:</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
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
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Phone Number:</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div>
                    <label>New Password:</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button onClick={handleCancelClick}>Cancel</button>
                </div>
              </div>
            </form>
          </div> */}
          <div className="right">
            <form onSubmit={handleSubmit}>
              {formInputs.map((formInput) => {
                return (
                  <FormInput
                    key={formInput.id} // Required to uniquely distinguish each item
                    {...formInput}
                    values={values[formInput.name]}
                    onChange={onChange}
                  />
                );
              })}
              <div className="phoneNumber">
                <label style={{ fontSize: "13px", color: "gray" }}>
                  Phone Number
                </label>
                <PhoneInput
                  country="sg"
                  inputProps={{ name: "phone", required: true }}
                  containerStyle={{ margin: "10px 0px" }}
                  inputStyle={{
                    height: "48px",
                    width: "250px",
                    borderRadius: "10px",
                    border: "1px solid gray",
                    fontSize: "13px",
                  }}
                  buttonStyle={{
                    background: "none",
                    padding: "5px",
                    borderTopLeftRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    border: "1px solid gray",
                    borderRight: "none",
                  }}
                  dropdownStyle={{ width: "250px", fontSize: "13px" }}
                  value={values["phone"]}
                  onChange={(phone) => setValues({ ...values, phone: phone })} // Cannot use onChange alr defined / https://eslint.org/docs/latest/rules/no-useless-computed-key
                />
              </div>
              <button>
                {registering ? ( // registering (true) = spinner will appear
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Submit"
                )}
              </button>
              <span className="registerErr">{errorMsg}</span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
