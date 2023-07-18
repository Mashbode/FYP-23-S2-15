import "./forminput.scss";
import { useState } from "react";

// const FormInput = (props) => {
const FormInput = ({ label, errorMessage, onChange, id, ...inputProps }) => {
  // const { label, errorMessage, onChange, id, ...inputProps } = props;
  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>
      {/* <input
        placeholder={props.placeholder}
        // 2. name={props.name}
        // onChange={(e) => props.setUsername(e.target.value)}
        // 1. ref={props.refer}
      /> */}
      <input
        {...inputProps}
        onChange={onChange}
        // onBlur event occurs when an HTML element loses focus.
        // focused will be changed to true if user was writing sth and clicks elsewhere
        onBlur={handleFocus}
        focused={focused.toString()}
        // This is specified only to Confirm Password to avoid knowing the pair does not match only when you click submit button
        onFocus={() => {
          inputProps.name === "confirmPassword" && setFocused(true);
        }}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
