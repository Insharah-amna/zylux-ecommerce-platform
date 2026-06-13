const nodeMailer = require("nodemailer");
const systemEmail = process.env.NODEMAILER_EMAIL;

const transporter = nodeMailer.createTransport({
	host: "smtp.gmail.com",
	port: 465,
	secure: true,
	auth: {
		user: systemEmail,
		pass: process.env.NODEMAILER_PASSWORD,
	},
});

exports.sendEmail = async ({ email, subject, html }) => {
	await transporter.sendMail({
		from: systemEmail,
		to: email,
		subject,
		html,
	});
};
