const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			// service: process.env.SERVICE,
			port: Number(process.env.EMAIL_PORT),
			// secure: Boolean(process.env.SECURE),
			auth: {
				user: process.env.MAILTRAP_USERNAME,
				pass: process.env.MAILTRAP_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: "suhail.demo@gmail.com",
			to: email,
			subject: subject,
			text: text,
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};