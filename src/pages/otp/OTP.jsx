// ***************************************************************************
// To prevent abuse, new projects currently have an SMS daily quota of 50/day.
// Make sure to add Phone numbers for testing
// ***************************************************************************

import "./otp.scss";

import CircularProgress from "@mui/material/CircularProgress";
import { toast, Toaster } from "react-hot-toast";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { db, auth } from "../../firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
// import ReCAPTCHA from "react-google-recaptcha";

import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [phone, setPhone] = useState("");
  const [progressing, setProgressing] = useState(false);
  const [user, setUser] = useState({});

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // https://firebase.google.com/docs/auth/web/phone-auth#use-invisible-recaptcha
  // https://firebase.google.com/docs/auth/web/phone-auth#optional:-specify-recaptcha-parameters
  const handleReCaptchaVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container", // id of empty <div> to contain ReCaptcha
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            handleSignIn();
          },
          "expired-callback": () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        },
        auth
      );
    }
  };

  // https://firebase.google.com/docs/auth/web/phone-auth#send-a-verification-code-to-the-users-phone
  const handleSignIn = () => {
    setProgressing(true);
    handleReCaptchaVerify();

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+" + phone, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the user in with confirmationResult.confirm(code).
        // toast.success("OTP sent successfully!");
        window.confirmationResult = confirmationResult;
        setProgressing(false);
        setShowOtp(true);
      })
      .catch((error) => {
        // Error; SMS not sent
        window.location.reload(); // Refresh the page when there is an error
        setProgressing(false);
      });
  };

  // Getting the users document that has a phone field that matches with the user's phone input
  // https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection
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
  const handleOTPVerify = () => {
    setProgressing(true);

    window.confirmationResult
      .confirm(otp)
      .then(() => {
        setProgressing(false);

        getUser();

        dispatch({ type: "LOGIN", payload: user });

        setProgressing(false);
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
          // Refresh after the toast message
          window.location.reload();
        }, 2000);
      });
  };

  return (
    <div>
      {/* https://react-hot-toast.com/ */}
      <Toaster toastOptions={{ duration: 2000 }} />
      <div id="recaptcha-container"></div>
      {/* <ReCAPTCHA // Version 2
        // sitekey="6LepZvgmAAAAADAKbms268rK5jJFAy28Z3yV6f3H" // 체크표시
        sitekey="6Ld6Cv4mAAAAAF1crKvlaFevtmpgpHZoJvkW7jXE" // 표시되지 않는
        size="invisible"
        // onChange={() => {}}
      /> */}
      <div className="otp">
        {showOtp ? ( // First it will show the page to input phone number (false)
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
              />
              <button id="verify-button" onClick={handleOTPVerify}>
                {progressing ? (
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
                dropdownStyle={{ width: "418.7px", fontSize: "13px" }}
                value={phone}
                onChange={setPhone}
              />
              <button onClick={handleSignIn}>
                {progressing ? ( // progressing (true) = spinner will appear
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
