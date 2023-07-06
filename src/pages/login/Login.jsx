import "./login.scss";
import FormInput from "../../components/forminput/FormInput";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [loggingIn, setLoggingIn] = useState(false);
  // const [loginDisabled, setLoginDisabled] = useState(true);

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
    e.preventDefault(); // Its to prevent refreshing
    setLoggingIn(true);

    signInWithEmailAndPassword(auth, values.email, values.password) // auth is exported from firebase.js
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // console.log(user);
        dispatch({ type: "LOGIN", payload: user });
        navigate("/home");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/user-not-found": // Email X Pwd O/X
            setErrorMsg("User is not found with provided email!");
            break;
          case "auth/wrong-password": // Email O Pwd X
            setErrorMsg("Provided password is wrong!");
            break;
          default:
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

        <div className="buttons">
          <button
          // disabled={loginDisabled}
          >
            {loggingIn ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              "Login"
            )}
          </button>
          <Link style={{ textDecoration: "none" }} to="/otp">
            <button>Login with OTP</button>
          </Link>
        </div>
        <div className="links">
          <Link to={`/register`}>Don't have an account?</Link>
          <Link to={`/restore`}>Forgot password?</Link>
        </div>
        {<span className="loginErr">{errorMsg}</span>}
      </form>
    </div>
  );
};

export default Login;
