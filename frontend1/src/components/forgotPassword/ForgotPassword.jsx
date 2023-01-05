import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const [id, setId] = useState('')
	const [otp, setOtp] = useState('')
	const navigate = useNavigate();


	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`/api/password-reset`, { email }).then((res) => {
				setId(res.data.userId);
				setOtp(res.data.otp);
				setMsg(res.data.message);
			});
			setError("");
			// navigate(`/password-reset/${id}/${otp}`);
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
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;