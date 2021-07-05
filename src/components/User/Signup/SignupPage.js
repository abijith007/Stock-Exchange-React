import React, { Component } from "react";

import Stepper from "react-stepper-horizontal";
import SignupForm from "./SignupForm";
import OtpForm from "./OtpForm";
import StepWizard from "react-step-wizard";

class SignupPage extends Component {
  state = {
    formValidated: null,
    currentStep: 1,
    isUsernameUnique: null,
    currentStep: 0,
  };

  changeCurrentStep = (step) => {
    this.setState({
      currentStep: step,
    });
  };

  onFormSubmit = (data) => {
    console.log(data);
    return true;
  };

  onOtpSubmit = (value) => {
    console.log();
    if (value.length === 6) {
      console.log(`OTP Entered ${value}`);
    }
  };

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "5rem" }}></div>
        <br />
        <StepWizard
          nav={
            <Stepper
              completeColor={"green"}
              titleTop={10}
              steps={[
                { title: "User Information" },
                { title: "OTP Validation" },
                { title: "Succefully Registered" },
              ]}
              activeStep={this.state.currentStep}
            />
          }
          initialStep={0}
        >
          <SignupForm
            {...this.state}
            onFormSubmit={this.onFormSubmit}
            saveInput={this.saveInput}
            changeCurrentStep={this.changeCurrentStep}
          />
          <OtpForm
            onOtpSubmit={this.onOtpSubmit}
            changeCurrentStep={this.changeCurrentStep}
          />
        </StepWizard>
      </div>
    );
  }
}

export default SignupPage;
