import React from "react";
import "./SignupForm.css";
import { useForm } from "react-hook-form";

const SignupForm = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitResponse = (data) => {
    let status = props.onFormSubmit(data);
    if (status === true) {
      props.goToStep(2);
      props.changeCurrentStep(1);
    }
  };

  return (
    <div className="form-wrapper ">
      <form
        onSubmit={handleSubmit(submitResponse)}
        className="needs-validation register-form"
      >
        <h2 className="form-h2">
          <b>Sign Up</b>
        </h2>
        <hr />
        <div className="row mb-2">
          <label htmlFor="email" className="col-sm-3 col-form-label form-label">
            Email
          </label>
          <div className="col-sm-9">
            <input
              {...register("email", {
                required: true,
                pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
              })}
              type="email"
              className="form-control"
              id="email"
            />
            {errors?.email?.type === "required" && (
              <p className="alert-danger">Please enter the email</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="alert-danger">Please enter a valid email</p>
            )}
          </div>
        </div>
        <div className="row mb-2">
          <label htmlFor="phone" className="col-sm-3 col-form-label form-label">
            Phone
          </label>
          <div className="col-sm-9">
            <input
              {...register("phone", {
                required: true,
                minLength: 10,
                maxLength: 10,
                pattern: "[0-9]+",
              })}
              type="text"
              className="form-control"
              id="phone"
            />
            {errors?.email?.type === "required" && (
              <p className="alert-danger">Please enter the phone number</p>
            )}
            {(errors?.email?.type === "minLength" ||
              errors?.email?.type === "maxLength") && (
              <p className="alert-danger">The phone number must be 10 digit</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="alert-danger">Please enter a valid phone number</p>
            )}
          </div>
        </div>
        <div className="row mb-2">
          <label
            htmlFor="username"
            className="col-sm-3 col-form-label form-label"
          >
            Username
          </label>
          <div className="col-sm-9">
            <input
              {...register("username", {
                required: true,
                minLength: 6,
              })}
              type="text"
              className="form-control"
              id="username"
            />
            {errors?.email?.type === "required" && (
              <p className="alert-danger">Please enter the username</p>
            )}
            {errors?.email?.type === "minLength" && (
              <p className="alert-danger">
                The username must of minimum 6 characters
              </p>
            )}
          </div>
        </div>
        <div className="row mb-2">
          <label
            htmlFor="password"
            className="col-sm-3 col-form-label form-label"
          >
            Password
          </label>
          <div className="col-sm-9">
            <input
              type="password"
              className="form-control"
              id="password"
              {...register("password", {
                required: true,
                pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
              })}
            />
            {errors?.email?.type === "required" && (
              <p className="alert-danger">Please enter the password</p>
            )}
            {errors?.email?.type === "pattern" && (
              <p className="alert-danger">
                The password must consist of a minimum of 8 characters, 1
                uppercase letter and 1 number
              </p>
            )}
          </div>
        </div>
        <br />
        <center>
          <button
            type="submit"
            className=" btn btn-primary"
            style={{
              fontSize: "1rem",
              fontWeight: "600",
              padding: "0.5rem 1rem",
              letterSpacing: "2px",
            }}
          >
            Register
          </button>
        </center>
      </form>
    </div>
  );
};

export default SignupForm;
