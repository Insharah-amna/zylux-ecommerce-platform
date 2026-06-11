const nodeMailer = require("nodemailer");
const systemEmail = process.env.NODEMAILER_EMAIL;

const transporter = nodeMailer.createTransport({
	service: "gmail",
	port: 587,
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
