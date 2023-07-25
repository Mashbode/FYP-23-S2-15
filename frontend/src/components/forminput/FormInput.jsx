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
      <input
        {...inputProps}
        onChange={onChange}
        // onBlur event occurs when an HTML element loses focus.
        onBlur={handleFocus}
        // focused will be changed to true if user was writing sth and clicks elsewhere
        focused={focused.toString()}
        // This is specified only to Confirm Password to avoid knowing the pair does not match only when you click "Submit" button
        onFocus={() => {
          inputProps.name === "confirmPassword" && setFocused(true);
        }}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormInput;
