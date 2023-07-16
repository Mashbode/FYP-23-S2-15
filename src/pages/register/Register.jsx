import "./register.scss";
import FormInput from "../../components/forminput/FormInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

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
      const result = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

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
      navigate("/login", { replace: true });
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setErrorMsg("Provided email is already in use!");
          break;
        default:
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
              key={formInput.id}
              {...formInput}
              values={values[formInput.name]}
              onChange={onChange}
            />
          );
        })}
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
            <CircularProgress color="inherit" size={20} />
          ) : (
            "Submit"
          )}
        </button>
        {<span className="registerErr">{errorMsg}</span>}
      </form>
    </div>
  );
};

export default Register;
