import React from "react";

import "./Homepage.css";
import LoginForm from "../User/Login/LoginForm";

const Homepage = () => {
  return (
    <div className="container-fluid" style={{ margin: "0px", padding: "0" }}>
      <div className="homepage-wrapper">
        <section className="hero-image">
          <div className="black-overlay">
            <div className="col-sm-7">
              <div className="hero-text">
                One stop place to analyse your stocks
              </div>
            </div>
            <div className="col-sm-5 login-placeholder">
              <LoginForm />
            </div>
          </div>
          <div className="login-placeholder-mobile">
            <LoginForm />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;
