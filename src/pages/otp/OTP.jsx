import "./otp.scss";
<<<<<<< HEAD
=======

import CircularProgress from "@mui/material/CircularProgress";
import { toast, Toaster } from "react-hot-toast";
>>>>>>> main
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
<<<<<<< HEAD
import CircularProgress from "@mui/material/CircularProgress";
import { db, auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useState, useContext } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
=======

import { db, auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
// import ReCAPTCHA from "react-google-recaptcha";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
>>>>>>> main

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
<<<<<<< HEAD
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(null);
=======
  const [progressing, setProgressing] = useState(false);
  const [user, setUser] = useState({});
>>>>>>> main

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

<<<<<<< HEAD
  // https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0&_gl=1*15phf25*_ga*MTY1MDUwNDE3NC4xNjg1NDU0ODQ5*_ga_CW55HF8NVT*MTY4ODYyMjUxOC42Mi4xLjE2ODg2MjI1MjguMC4wLjA.#use-invisible-recaptcha
  function onReCaptchaVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        // "send-code",
        "recaptcha-container",
        {
          size: "invisible",
          // size: "normal",
          callback: (response) => {
=======
  // https://firebase.google.com/docs/auth/web/phone-auth#use-invisible-recaptcha
  // https://firebase.google.com/docs/auth/web/phone-auth#optional:-specify-recaptcha-parameters
  const onReCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // id of empty <div> to contain ReCaptcha
        {
          size: "invisible",
          callback: () => {
>>>>>>> main
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            onSignIn();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        },
        auth
      );
    }
<<<<<<< HEAD
  }

  // https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0&_gl=1*15phf25*_ga*MTY1MDUwNDE3NC4xNjg1NDU0ODQ5*_ga_CW55HF8NVT*MTY4ODYyMjUxOC42Mi4xLjE2ODg2MjI1MjguMC4wLjA.#send-a-verification-code-to-the-users-phone
  function onSignIn() {
    setLoading(true);
    onReCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, "+" + phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        // toast.success("OTP sent successfully!");
        window.confirmationResult = confirmationResult;
        setLoading(false);
=======
  };

  // https://firebase.google.com/docs/auth/web/phone-auth#send-a-verification-code-to-the-users-phone
  const onSignIn = () => {
    setProgressing(true);
    onReCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+" + phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
        // toast.success("OTP sent successfully!");
        window.confirmationResult = confirmationResult;
        setProgressing(false);
>>>>>>> main
        setShowOtp(true);
      })
      .catch((error) => {
        // Error; SMS not sent
<<<<<<< HEAD
        console.log(error);
        window.location.reload();
        setLoading(false);
        // if (
        //   error.message.includes("reCAPTCHA client element has been removed")
        // ) {
        //   window.location.reload();
        // }
        // setLoading(false);
      });
  }

  // https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0&_gl=1*15phf25*_ga*MTY1MDUwNDE3NC4xNjg1NDU0ODQ5*_ga_CW55HF8NVT*MTY4ODYyMjUxOC42Mi4xLjE2ODg2MjI1MjguMC4wLjA.#sign-in-the-user-with-the-verification-code
  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((result) => {
        setLoading(false);
        // console.log(result.user);
        // setUser(result.user);
        const user = result.user;

        setDoc(doc(db, "users", user.uid), {
          phoneNumber: user.phoneNumber,
          status: "activated",
          type: "user",
          timeStamp: serverTimestamp(),
        });

        dispatch({ type: "LOGIN", payload: user });
=======
        window.location.reload(); // Refresh the page when there is an error
        setProgressing(false);
      });
  };

  // Getting the users document that has a phone field that matches with the user's phone input
  const getUser = async () => {
    const q = query(collection(db, "users"), where("phone", "==", "+" + phone));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setUser({ uid: doc.id, ...doc.data() });
    });
  };

  // https://firebase.google.com/docs/auth/web/phone-auth#sign-in-the-user-with-the-verification-code
  const onOTPVerify = () => {
    setProgressing(true);

    window.confirmationResult
      .confirm(otp)
      .then(() => {
        setProgressing(false);

        getUser();

        dispatch({ type: "LOGIN", payload: user });

        setProgressing(false);
>>>>>>> main
        navigate("/home");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        switch (error.code) {
          case "auth/invalid-verification-code":
            toast.error("Verification code does not match.");
            break;
          default:
            toast.error(`Contact admin: ${error.code}`);
            break;
        }
        setTimeout(() => {
<<<<<<< HEAD
          window.location.reload();
        }, 2000);
        // setLoading(false);
      });
  }

  return (
    <div>
=======
          // Refresh after the toast message
          window.location.reload();
        }, 1000);
      });
  };

  return (
    <div>
      {/* https://react-hot-toast.com/ */}
>>>>>>> main
      <Toaster toastOptions={{ duration: 2000 }} />
      <div id="recaptcha-container"></div>
      {/* <ReCAPTCHA // Version 2
        // sitekey="6LepZvgmAAAAADAKbms268rK5jJFAy28Z3yV6f3H" // 체크표시
        sitekey="6Ld6Cv4mAAAAAF1crKvlaFevtmpgpHZoJvkW7jXE" // 표시되지 않는
        size="invisible"
<<<<<<< HEAD
        // onChange={() => {
        //   setLoginDisabled(false);
        // }}
      /> */}
      <div className="otp">
        {/* {user ? (
          "Login success"
          ) : (
            <>
            
            </>
          )} */}
        {showOtp ? ( // otp vs phone
=======
        // onChange={() => {}}
      /> */}
      <div className="otp">
        {showOtp ? ( // First it will show the page to input phone number (false)
>>>>>>> main
          <>
            <div className="form">
              <h1>
                <BsFillShieldLockFill className="icon" size={30} />
                Enter your OTP
              </h1>
              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                disabled={false}
                autoFocus
                className="otpContainer"
              ></OtpInput>
<<<<<<< HEAD
              <button onClick={onOTPVerify}>
                {loading ? (
=======
              <button id="verify-button" onClick={onOTPVerify}>
                {progressing ? (
>>>>>>> main
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Verify"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="form">
              <h1>
                <BsTelephoneFill className="icon" size={30} />
                Enter your phone number
              </h1>
              <PhoneInput
<<<<<<< HEAD
                country={"sg"}
                value={phone}
                onChange={setPhone}
              ></PhoneInput>
              <button
                // id="send-code"
                onClick={onSignIn}
              >
                {loading ? (
=======
                country="sg"
                inputProps={{ name: "phone", required: true }}
                containerStyle={{ margin: "10px 0px" }}
                inputStyle={{
                  height: "49.33px",
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
                dropdownStyle={{ width: "418.7px", fontSize: "13px" }}
                value={phone}
                onChange={setPhone}
              />
              <button onClick={onSignIn}>
                {progressing ? ( // progressing (true) = spinner will appear
>>>>>>> main
                  <CircularProgress color="inherit" size={20} />
                ) : (
                  "Send code via SMS"
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OTP;
