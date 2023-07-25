import "./register.scss";
import FormInput from "../../components/forminput/FormInput";
<<<<<<< HEAD
=======
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CircularProgress from "@mui/material/CircularProgress";
>>>>>>> main
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
<<<<<<< HEAD
import CircularProgress from "@mui/material/CircularProgress";

const Register = () => {
  // const [username, setUsername] = useState("");
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  }); // Handle multiple input
  const [registering, setRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
=======

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }); // Handle multiple input at once
  const [registering, setRegistering] = useState(false); // Spinner icon
  const [errorMsg, setErrorMsg] = useState(""); // Error msg on register
>>>>>>> main

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
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
<<<<<<< HEAD
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Birthday",
      label: "Birthday",
      required: true,
    },
    {
      id: 4,
=======
    // {
    //   id: 3,
    //   name: "birthday",
    //   type: "date",
    //   placeholder: "Birthday",
    //   label: "Birthday",
    //   required: true,
    // },
    {
      id: 3,
>>>>>>> main
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
<<<<<<< HEAD
      id: 5,
=======
      id: 4,
>>>>>>> main
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

<<<<<<< HEAD
  // console.log(username);
  // console.log("re-rendered"); // Keeps re-rendering whenever the user types something inside a input: 1. useRef() 2. Object FormData
  // 1. const usernameRef = useRef();

  const navigate = useNavigate();

  const onChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistering(true);
    // 1. console.log(usernameRef);
    // 2. const data = new FormData(e.target);
    // 2. console.log(data);
    // 2. console.log(Object.fromEntries(data.entries()));

    // await createUserWithEmailAndPassword(auth, values.email, values.password)
    //   .then(() => {
    //     // // Signed in
    //     // const user = userCredential.user;
    //     // // ...
    //     console.log("success");
    //   })
    //   .catch((error) => {
    //     // const errorCode = error.code;
    //     // const errorMessage = error.message;
    //     // // ..
    //     console.log(error);
    //   });

    //   await setDoc(doc(db, "users", res.user.uid), {
    //     ...data,
    //     timeStamp: serverTimestamp(),
    //   });
    try {
=======
  const navigate = useNavigate();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // async includes await funciton
  const handleSubmit = async (e) => {
    e.preventDefault(); // This is to prevent refreshing
    setRegistering(true);

    try {
      // Provided by Firebase (Authentication)
>>>>>>> main
      const result = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

<<<<<<< HEAD
      const { birthday, email, username } = values;

      await setDoc(doc(db, "users", result.user.uid), {
        birthday: birthday,
        email: email,
        username: username,
        status: "activated",
        type: "user",
        timeStamp: serverTimestamp(),
      });

      // setRegistering(false);
=======
      const { email, username, phone } = values;

      // Provided by Firebase (Database)
      await setDoc(doc(db, "users", result.user.uid), {
        email: email,
        username: username,
        phone: "+" + phone, // "+" is required in order to reflect country code
        status: "activated", // status will be "deactivated" when the account is deleted
        type: "user", // Added to differentiate the sidebar
        timeStamp: serverTimestamp(),
      });
      setRegistering(false);

>>>>>>> main
      navigate("/login", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Provided email is already in use!");
          break;
<<<<<<< HEAD
        default:
=======
        default: // All the other errors
>>>>>>> main
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
<<<<<<< HEAD
              key={formInput.id}
=======
              key={formInput.id} // Required to uniquely distinguish each item
>>>>>>> main
              {...formInput}
              values={values[formInput.name]}
              onChange={onChange}
            />
          );
        })}
<<<<<<< HEAD
        {/* <FormInput
          placeholder="Username"
          // setUsername={setUsername}
          // 1. refer={usernameRef}
          name="username"
          />
          <FormInput name="email" placeholder="Email" />
          <FormInput name="fullname" placeholder="Full Name" />
          <FormInput name="sth" placeholder="Sth else" /> */}
        <button>
          {registering ? (
=======
        <label style={{ fontSize: "13px", color: "gray" }}>Phone Number</label>
        <PhoneInput
          country="sg"
          inputProps={{ name: "phone", required: true }}
          containerStyle={{ margin: "10px 0px" }}
          inputStyle={{
            height: "49.33px",
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
        <button>
          {registering ? ( // registering (true) = spinner will appear
>>>>>>> main
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Submit"
          )}
        </button>
<<<<<<< HEAD
        {<span className="registerErr">{errorMsg}</span>}
=======
        <span className="registerErr">{errorMsg}</span>
>>>>>>> main
      </form>
    </div>
  );
};

export default Register;
