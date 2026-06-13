const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async ({ email, subject, html }) => {
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject,
		html,
	});
};
