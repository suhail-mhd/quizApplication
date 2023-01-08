import { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import ErrorMessage from "../../components/ErrorMessage";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submitHandle = async (data) => {
    const { firstName, lastName, email, password, confirmPassword, phone } =
      data;

    if (password !== confirmPassword) {
      setError("Password Not Matching");
    } else {
      try {
        const { data, status } = await axios.post("/api/user/registerUser", {
          firstName,
          lastName,
          email,
          phone,
          password,
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/");
      } catch (error) {
        console.log(error);
        setError("Cannot use the existed data(email,phone)");
      }
    }
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      navigate("/");
    } else {
      navigate("/signup");
    }
  }, []);

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/">
            <button type="button" className={styles.white_btn}>
              Sing in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form
            className={styles.form_container}
            noValidate
            onSubmit={handleSubmit(submitHandle)}
          >
            <h1>Create Account</h1>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Grid container spacing={2} style={{ textAlign: "center" }}>
              <Grid item xs={12} sm={12} lg={6} md={6}>
                <TextField
                  style={{ width: "250px" }}
                  autoComplete="given-name"
                  name="firstName"
                  required
                  id="firstName"
                  label="First Name"
                  autoFocus
                  variant="filled"
                  {...register("firstName", {
                    required: "First Name is required",
                    minLength: { value: 2, message: "minimum length is 2" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.name && errors.name.message}
                </p>
              </Grid>
              <Grid item xs={12} sm={12} lg={6} md={6}>
                <TextField
                  style={{ width: "250px" }}
                  autoComplete="given-name"
                  name="lastName"
                  required
                  id="lastName"
                  label="Last Name"
                  autoFocus
                  variant="filled"
                  {...register("lastName", {
                    required: "Last Name is required",
                    minLength: { value: 2, message: "minimum length is 2" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.name && errors.name.message}
                </p>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                  style={{ width: "250px" }}
                  required
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  variant="filled"
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
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                  style={{ width: "250px" }}
                  required
                  variant="filled"
                  label="Phone"
                  placeholder="Enter Phone"
                  type="number"
                  name="phone"
                  {...register("phone", {
                    required: "Phone is required",
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
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                  style={{ width: "250px" }}
                  required
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  variant="filled"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: "6", message: "Minimum limit is 6" },
                  })}
                />
                <p style={{ color: "red", fontSize: "12px" }}>
                  {errors.password && errors.password.message}
                </p>
              </Grid>
              <Grid item xs={12} lg={6} md={6}>
                <TextField
                  style={{ width: "250px" }}
                  variant="filled"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  type="password"
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
            </Grid>
            <button type="submit" className={styles.green_btn}>
              Sing Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
