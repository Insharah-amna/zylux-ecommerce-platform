const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

exports.sendEmail = async ({ email, subject, html }) => {
	try {
		const result = await resend.emails.send({
			from: "onboarding@resend.dev",
			to: email,
			subject,
			html,
		});
		console.log("Email sent successfully:", result);
	} catch (error) {
		console.error("Email sending failed:", error);
	}
};
