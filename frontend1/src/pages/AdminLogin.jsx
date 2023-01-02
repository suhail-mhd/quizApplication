import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import axios from "axios";
import "../pages/userLogin/userLogin.css";
import ErrorMessage from '../components/ErrorMessage'

function AdminLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandle = async (data) => {
    const { email, password } = data;

    try {
      const { data, status } = await axios.post("/api/admin/adminLogin", {
        email,
        password,
      });

      localStorage.setItem("Admin", JSON.stringify(data));
      navigate("/adminHome");
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
    }
  };

  useEffect(() => {
    const adminInfo = localStorage.getItem("Admin");
    if (adminInfo) {
      navigate("/adminHome");
    } else {
      navigate("/admin");
    }
  }, []);

  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="right">
          <form
            className="form_container"
            onSubmit={handleSubmit(submitHandle)}
            noValidate
          >
            <h1 style={{ color: "#333" }}>Login to Admin Account</h1>
            {error && <ErrorMessage>{error}</ErrorMessage>}

            <TextField
              className={"input"}
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
              className={"input"}
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
          <h1>Welcome Admin</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
