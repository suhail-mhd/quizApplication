import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./userSignUp.css";
import axios from "axios";
import ErrorMessage from "../../components/ErrorMessage";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function UseSignUp() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandle = async (data) => {
    const { name, email, password, confirmPassword, phone } = data;

    if (password !== confirmPassword) {
      setError("Password Not Matching");
    } else {
      //   setLoading(true)
      try {
        const { data, status } = await axios.post("/api/user/registerUser", {
          name,
          email,
          phone,
          password,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        //    setLoading(false)
        navigate("/");
      } catch (error) {
        console.log(error);
        //  setLoading(false)
        setError("Cannot use the existed data(email,phone)");
      }
    }
  };

  return (
    <>
      <div className="signup_container">
        <div className="signup_form_container">
          <div className="left">
            <h1>Welcome Back</h1>
            <Link to="/">
              <button type="button" className="white_btn">
                Sign In
              </button>
            </Link>
          </div>
          <div className="right">
            <form
              className="form_container"
              noValidate
              onSubmit={handleSubmit(submitHandle)}
            >
              <h1 style={{ color: "#333" }}>Create Account</h1>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <Grid item xs={12} sm={12} style={{ width: "370px" }}>
                <TextField
                  className="input"
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  variant="standard"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "minimum length is 2" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.name && errors.name.message}
                </p>
              </Grid>
              <Grid item xs={12} style={{ width: "370px" }}>
                <TextField
                  className="input"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="standard"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "This is not a valid email",
                    },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.email && errors.email.message}
                </p>
              </Grid>
              <Grid item xs={12} style={{ width: "370px" }}>
                <TextField
                  className="input"
                  required
                  variant="standard"
                  label="Phone"
                  placeholder="Enter Phone"
                  type="number"
                  name="phone"
                  fullWidth
                  {...register("phone", {
                    required: "Number is required",
                    minLength: {
                      value: "10",
                      message: "Phone Number requires 10 digits",
                    },
                    maxLength: {
                      value: "10",
                      message: "maximum length is 10 digit",
                    },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.phone && errors.phone.message}
                </p>
              </Grid>
              <Grid item xs={12} style={{ width: "370px" }}>
                <TextField
                  className="input"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="standard"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: "6", message: "Minimum limit is 6" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.password && errors.password.message}
                </p>
              </Grid>
              <Grid item xs={12} style={{ width: "370px" }}>
                <TextField
                  className="input"
                  variant="standard"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
                  fullWidth
                  name="confirmPassword"
                  {...register("confirmPassword", {
                    required: "ConfirmPassword is required",
                    minLength: { value: "6", message: "Minimum limit is 6" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.confirmPassword && errors.confirmPassword.message}
                </p>
              </Grid>
              <button type="submit" className="green_btn">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UseSignUp;
