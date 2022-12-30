import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from 'react-hook-form'
import "./userLogin.css";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import TextField from "@mui/material/TextField";

function UserLogin() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="right">
          <form
            className="form_container"
            //    onSubmit={submitHandler}
          >
            <h1 style={{ color: "#333" }}>Login to Your Account</h1>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TextField
            className={'input'}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant="standard"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "This is not a valid email",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.email && errors.email.message}
            </p>

            <TextField
            className={'input'}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum length is 6 characters",
                },
              })}
            />
            <p style={{ color: "red", fontSize: "12px" }}>
              {errors.password && errors.password.message}
            </p>
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </div>
        <div className="left">
          <h1>New Here ?</h1>
          <Link to="/useSignUp">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
