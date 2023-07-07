import "./otp.scss";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState, useContext } from "react";
// import ReCAPTCHA from "react-google-recaptcha";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState(null);

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

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
        setShowOtp(true);
      })
      .catch((error) => {
        // Error; SMS not sent
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
        // console.log(result.user);
        // setUser(result.user);
        setLoading(false);

        dispatch({ type: "LOGIN", payload: result.user });
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
          window.location.reload();
        }, 2000);
        // setLoading(false);
      });
  }

  return (
    <div>
      <Toaster toastOptions={{ duration: 2000 }} />
      <div id="recaptcha-container"></div>
      {/* <ReCAPTCHA // Version 2
        // sitekey="6LepZvgmAAAAADAKbms268rK5jJFAy28Z3yV6f3H" // 체크표시
        sitekey="6Ld6Cv4mAAAAAF1crKvlaFevtmpgpHZoJvkW7jXE" // 표시되지 않는
        size="invisible"
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
              <button onClick={onOTPVerify}>
                {loading ? (
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
                country={"sg"}
                value={phone}
                onChange={setPhone}
              ></PhoneInput>
              <button
                // id="send-code"
                onClick={onSignIn}
              >
                {loading ? (
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
