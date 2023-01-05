import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";

const GetOtp = () => {
	// const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
    const [otp, setOtp] = useState('')
    const location = useLocation();

  const email = location.state?.name;

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			// const url = `/api/password-reset`;
			// const { data } = await axios.post(url, { email });
            axios.get('/api/password-reset/otp').then((res) => {
                console.log(res);
                setOtp(res.data[0].otp)
            })
			// setMsg(data.message);
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
    

	return (
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Get OTP</h1>
				<input
					type="text"
					placeholder="Otp"
					name="otp"
					value={otp}
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

export default GetOtp;