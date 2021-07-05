import React, { useState } from "react";

import "./OtpForm.css";
const OtpForm = (props) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    //Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const validate = () => {
    let emptyValues = otp.filter((val) => val === "");
    if (emptyValues.length > 0) {
      alert("Invalid otp");
    } else {
      props.onOtpSubmit(otp.join(""));
    }
  };
  return (
    <div className="otp-wrapper">
      <div id="otp-form" style={{ width: "100%" }}>
        <div className="row" style={{ margin: "0px" }}>
          <div className="text-center">
            <h2>Email Verification</h2>
            <br />
            <p>Please enter the OTP sent to your registered email</p>

            {otp.map((data, index) => {
              return (
                <input
                  className="otp-field"
                  type="text"
                  name="otp"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <br />
            <p>
              <button
                className="btn btn-secondary mr-2"
                onClick={(e) => setOtp([...otp.map((v) => "")])}
              >
                Clear
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-primary" onClick={(e) => validate()}>
                Verify OTP
              </button>
            </p>
          </div>
        </div>
        <div className="row">
          <div className="text-center">
            <br />
            <p>
              <button
                className="btn btn-info mr-2"
                onClick={(e) => {
                  props.goToStep(1);
                  props.changeCurrentStep(0);
                }}
              >
                Go back
              </button>
              &nbsp;&nbsp;&nbsp;
              <button className="btn btn-secondary" onClick={(e) => validate()}>
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
