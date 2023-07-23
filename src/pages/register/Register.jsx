import "./register.scss";
import FormInput from "../../components/forminput/FormInput";
import PhoneInput from "react-phone-input-2";
import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  }); // Handle multiple input at once
  const [registering, setRegistering] = useState(false); // For loading icon
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
      id: 4,
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

  const onChange = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    setRegistering(true);

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const { email, username, phone } = values;

      await setDoc(doc(db, "users", result.user.uid), {
        email: email,
        username: username,
        phone: "+" + phone,
        status: "activated",
        type: "user",
        timeStamp: serverTimestamp(),
      });

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
        <label style={{ fontSize: "13px", color: "gray" }}>Phone Number</label>
        <PhoneInput
          containerClass={"formInput"}
          country={"sg"}
          inputProps={{ name: "phone", required: true }}
          containerStyle={{ margin: "10px 0px" }}
          inputStyle={{
            height: "49.33px",
            width: "250px",
            borderRadius: "10px",
            border: "1px solid gray",
          }}
          buttonStyle={{
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            border: "1px solid gray",
            borderRight: "none",
          }}
          value={values["phone"]}
          onChange={(phone) => setValues({ ...values, ["phone"]: phone })}
        />
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
