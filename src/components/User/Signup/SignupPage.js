import axios from "axios";
import React, { Component } from "react";
import SignupForm from "./SignupForm";
class SignupPage extends Component {
  state = {
    formValidated: null,
    currentStep: 0,
    isUsernameUnique: null,
  };

  changeCurrentStep = (step) => {
    this.setState({
      currentStep: step,
    });
  };

  onFormSubmit = (data) => {
    console.log(data);
    axios
      .post("http://localhost:4000/api/auth/signup", data)
      .then((res) => window.location.replace("/"));
  };

  render() {
    return (
      <div className="container">
        <div style={{ marginTop: "5rem" }}></div>
        <br />

        <SignupForm
          {...this.state}
          onFormSubmit={this.onFormSubmit}
          saveInput={this.saveInput}
          changeCurrentStep={this.changeCurrentStep}
        />
      </div>
    );
  }
}

export default SignupPage;
