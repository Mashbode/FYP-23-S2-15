import "./restore.scss";
import FormInput from "../../components/forminput/FormInput";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import AlertDialog from "../../components/dialog/AlertDialog";

const Restore = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    email: "",
  });
  const [restoring, setRestoring] = useState(false);
  const [alertDialog, setAlertDialog] = useState(false);

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
    e.preventDefault(); // Its to prevent refreshing
    setRestoring(true);

    sendPasswordResetEmail(auth, values.email) // auth is exported from firebase.js
      .then(() => {
        setRestoring(false);
        setAlertDialog(true);
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found": // Email X Pwd O/X
            setErrorMsg("User is not found with provided email!");
            break;
          default:
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
        {/* <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          />
          <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        /> */}
        <button>
          {restoring ? (
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Restore"
          )}
        </button>
        {<span className="restoreErr">{errorMsg}</span>}
      </form>
      {alertDialog && <AlertDialog />}
    </div>
  );
};

export default Restore;
