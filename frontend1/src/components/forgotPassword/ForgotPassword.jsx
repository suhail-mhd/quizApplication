import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [id, setId] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/password-reset`, { email }).then((res) => {
        setId(res.data.userId);
        setOtp(res.data.otp);
        setMsg(res.data.message);
      });
      setIsSubmit(true);
      setError("");
    } catch (error) {
		if (
			error.response &&
			error.response.status >= 400 &&
			error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};
	
	const toReset = () => {
	  navigate(`/password-reset/${id}/${otp}`);
  }

  return (
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          className={styles.input}
        />
        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
        {isSubmit ? (
          ""
        ) : (
          <button type="submit" className={styles.green_btn}>
            Submit
          </button>
        )}
      </form>
      {isSubmit ? (
        <button
          type="button"
          className={styles.green_btn}
          style={{ position: "absolute", marginTop: "9.5rem" }}
		  onClick={toReset}
        >
          Go to Reset Password
        </button>
      ) : (
        ""
      )}
    </div>
  );
};

export default ForgotPassword;
