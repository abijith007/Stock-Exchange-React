import React, { Component } from "react";
import "./LoginForm.css";

import axios from "axios";

class LoginForm extends Component {
  state = {};

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:4000/api/auth/signin", {
        username: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("jwt", res.data.accessToken);
          if (this.state.username === "admin")
            window.location.replace("/admin/manage_company");
          else window.location.replace("/compare_company");
        }
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div className="login-wrapper">
        <form className="login-form" onSubmit={this.handleLoginSubmit}>
          <h2 className="h2-login">Login</h2>
          <hr />
          <div className="mb-2">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              onChange={this.onChange}
              className="form-control"
              id="username"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={this.onChange}
              className="form-control"
              id="password"
            />
          </div>

          <center>
            <button type="submit" className="btn btn-primary login-button">
              Login
            </button>
          </center>
        </form>
      </div>
    );
  }
}

export default LoginForm;
