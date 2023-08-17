import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
        setError("User not authenticated."); // Handle the case where user is not authenticated
        return;
      }

      // Re-authenticate user with current password before changing it
      const credentials = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credentials);

      // Update password
      await updatePassword(user, newPassword); // Use auth.updatePassword()
      alert("Password successfully changed!");
      console.log("Password updated successfully");
      navigate(-1); // return to profile page ones success
    } catch (error) {
      setError(error.message);
      console.error("Error changing password:", error);
    }
  };

  return (
    <div>
      <h2>Change Password</h2>
      {error && <p className="error-message">{error}</p>}
      <input
        type="password"
        placeholder="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
};

export default ChangePassword;
