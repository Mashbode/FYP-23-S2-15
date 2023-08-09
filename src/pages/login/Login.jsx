import "./login.scss";
import FormInput from "../../components/forminput/FormInput";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
// import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  }); // Handle multiple input at once
  const [loggingIn, setLoggingIn] = useState(false); // Spinner icon
  const [errorMsg, setErrorMsg] = useState(""); // Error msg on register

  const { dispatch } = useContext(AuthContext);
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
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];

  // Its possible to set this function to onClick inside a <button>
  const handleLogin = (e) => {
    e.preventDefault(); // This is to prevent refreshing
    setLoggingIn(true);

    // Provided by Firebase (Authentication)
    signInWithEmailAndPassword(auth, values.email, values.password) // auth is exported from firebase.js
      .then((userCredential) => {
        // When signin succeed
        // Signed in
        const user = userCredential.user;

        // Things to send to file system
        // 1. userID = console.log(user.uid)

        dispatch({ type: "LOGIN", payload: user });
        navigate("/home");
      })
      .catch((error) => {
        // When signin failed
        switch (error.code) {
          case "auth/user-not-found": // Email X Pwd O/X
            setErrorMsg("User is not found with provided email!");
            break;
          case "auth/wrong-password": // Email O Pwd X
            setErrorMsg("Provided password is wrong!");
            break;
          default: // All the other errors
            setErrorMsg(`Contact admin: ${error.code}`);
            break;
        }

        setLoggingIn(false);
      });
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
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
        {/* <ReCAPTCHA // Version 2
          sitekey="6LepZvgmAAAAADAKbms268rK5jJFAy28Z3yV6f3H" // 체크표시
          // sitekey="6Ld6Cv4mAAAAAF1crKvlaFevtmpgpHZoJvkW7jXE" // 표시되지 않는
          // size="invisible"
          onChange={() => {
            setLoginDisabled(false);
          }}
        /> */}
        <div className="buttons">
          <button>
            {loggingIn ? ( // loggingIn (true) = spinner will appear
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Login"
            )}
          </button>
          <hr className="hrText" dataContent="or" />
          <Link style={{ textDecoration: "none" }} to={`/otp`}>
            <button>Login with OTP</button>
          </Link>
        </div>
        <div className="links">
          <Link to={`/register`}>Don't have an account?</Link>
          <Link to={`/restore`}>Forgot password?</Link>
        </div>
        <span className="loginErr">{errorMsg}</span>
      </form>
    </div>
  );
};

export default Login;
