import "./changepassword.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";

import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import FormInput from "../../components/forminput/FormInput";

import { toast, Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChangePassword = async () => {
    setError("");

    try {
      const user = auth.currentUser;

      if (!user) {
        // setError("User not authenticated."); // Handle the case where user is not authenticated
        console.log("User not authenticated from firebase.");
        toast.error("User not authenticated.");
        return;
      }

      // Re-authenticate user with current password before changing it
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      // await reauthenticateWithCredential(user, credentials);

      // Update password
      await updatePassword(user, newPassword); // Use auth.updatePassword()
      console.log("Password updated successfully");
      toast.success("Password updated successfully!");
      setTimeout(() => {
            navigate(-1);
          }, 3000);
    } catch (error) {
      setError(error.message);
      console.error("Error changing password:", error);
      toast.error("Error changing password:", error);
      setTimeout(() => {
        navigate(-1);
      }, 3000);
    }
  };

  return (
    <div className="changePassword">
      <Sidebar />
      <div className="pageContainer">
        <Navbar />
        <div className="changePasswordContainer">
          <Toaster toastOptions={{ duration: 3000 }} />
          <div className="changePasswordTitle">
            Change Password
          </div>
          {/* {error && <p className="error-message">{error}</p>} */}
          {/* <FormInput
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            errorMessage="Passwords don't match!"
            label="Current Password"
            required={true}
            onChange={(e) => setCurrentPassword(e.target.value)}
            value={currentPassword}
          /> */}
          <div className="form-input-container">
            <FormInput
              name="newPassword"
              type="password"
              placeholder="New Password"
              errorMessage="Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!"
              pattern="^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$"
              required={true}
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
            <div className="button-container">
              <button className="change-password-button" onClick={handleChangePassword}>
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
