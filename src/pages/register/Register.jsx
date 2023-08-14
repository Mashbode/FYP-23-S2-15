import "./register.scss";
import FormInput from "../../components/forminput/FormInput";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import instance from "../../axios_config";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }); // Handle multiple input at once
  const [registering, setRegistering] = useState(false); // Spinner icon
  const [errorMsg, setErrorMsg] = useState(""); // Error msg on register

  const formInputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
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
      placeholder: "First Name",
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
      placeholder: "Last Name",
      errorMessage:
        "Last name should be 1-32 characters and shouldn't include any special character or number!",
      label: "Last Name",
      pattern: "^[A-Za-z]{1,32}$",
      required: true, // When tried to submit with invalid input, it prevents submission
    },
    {
      id: 4,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    // {
    //   id: 3,
    //   name: "birthday",
    //   type: "date",
    //   placeholder: "Birthday",
    //   label: "Birthday",
    //   required: true,
    // },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // async includes await function
  const handleSubmit = async (e) => {
    e.preventDefault(); // This is to prevent refreshing
    setRegistering(true);

    try {
      // Provided by Firebase (Authentication)
      const result = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      // User created successfully -> Clear password (PDPA)
      values.password = null;

      const { username, firstName, lastName, email, phone } = values;

      // ************** Connect with Django (setDoc) **************
      /* `instance` is an instance of the Axios library that is configured with a base URL and
      other settings. It is used to make HTTP requests to the backend server. In this code, it
      is used to send a POST request to the backend server with the user registration data. */
      await instance
        .post("Users", {
          u_id: result.user.uid, // u_id >> client_id >> file_id
          username: username,
          f_name: firstName,
          l_name: lastName,
          email: email,
          phone_number: "+" + phone,
          usertype: "Client",
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.error(err));

      // Things to send to file system
      // 1. userID = console.log(result.user.uid)
      // 2. In the file system following directory should be created
      // c.f.) https://docs.google.com/document/d/1_TfokixhMlvAl3r5gH4lYefZ_f27AXWUZR4_qwghMXA/edit?usp=drive_link
      // result.user.uid/shared
      // result.user.uid/deleted

      // Provided by Firebase (Database)
      // "users" -> table name / result.user.uid -> id of the table
      await setDoc(doc(db, "users", result.user.uid), {
        // {email: emailValue, phone: phoneValue ...}
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: "+" + phone, // "+" is required in order to reflect country code
        type: "Client", // Added to differentiate the sidebar
        timeStamp: serverTimestamp(),
      });
      // **********************************************************
      setRegistering(false);

      navigate("/login", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Provided email is already in use!");
          break;
        default: // All the other errors
          setErrorMsg(`Contact admin: ${error.code}`);
          break;
      }

      setRegistering(false);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
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
        <label style={{ fontSize: "13px", color: "gray" }}>Phone Number</label>
        <PhoneInput
          country="sg"
          inputProps={{ name: "phone", required: true }}
          containerStyle={{ margin: "10px 0px" }}
          inputStyle={{
            height: "48px",
            width: "100%",
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
  );
};

export default Register;
