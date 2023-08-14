import "./restore.scss";
import FormInput from "../../components/forminput/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import { toast, Toaster } from "react-hot-toast";

const Restore = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    email: "",
  });
  const [restoring, setRestoring] = useState(false);
  const navigate = useNavigate();

  const formInputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true, // When tried to submit with invalid input, it prevents submission
    },
  ];

  // Its possible to set this function to onClick inside a <button>
  const handleRestore = (e) => {
    e.preventDefault(); // This is to prevent refreshing
    setRestoring(true);

    // https://firebase.google.com/docs/auth/web/manage-users#send_a_password_reset_email
    sendPasswordResetEmail(auth, values.email) // auth is exported from firebase.js
      .then(() => {
        // When sending email succeed
        setRestoring(false);
        toast.success("We sent an email with the link to your account.");
        setTimeout(() => {
          // Navigate to login page after the toast message
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        // When sending email failed
        switch (error.code) {
          case "auth/user-not-found": // Email X Pwd O/X
            setErrorMsg("User is not found with provided email!");
            break;
          default: // All the other errors
            setErrorMsg(`Contact admin: ${error.code}`);
            break;
        }
        setRestoring(false);
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="restore">
      {/* https://react-hot-toast.com/ */}
      <Toaster toastOptions={{ duration: 3000 }} />
      <form onSubmit={handleRestore}>
        <h1>Restore</h1>
        {formInputs.map((formInput) => {
          return (
            <FormInput
              key={formInput.id}
              {...formInput}
              values={values[formInput.name]}
              onChange={onChange}
            />
          );
        })}
        <button>
          {restoring ? ( // restoring (true) = spinner will appear
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Restore"
          )}
        </button>
        <span className="restoreErr">{errorMsg}</span>
      </form>
    </div>
  );
};

export default Restore;
