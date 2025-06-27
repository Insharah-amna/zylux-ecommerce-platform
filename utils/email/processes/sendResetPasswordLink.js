const { generateFrontendUrl } = require("../../generalUtils");
const { generateToken } = require("../../jwtUtils");
const { sendEmail } = require("../send");

exports.sendResetPasswordLink = async ({ user }) => {
	const tokenPayload = {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
	};
	const { token } = generateToken({
		payLoad: tokenPayload,
		expiresIn: "1h",
	});

	const resetUrl = generateFrontendUrl({ path: "auth/reset-password", token });

	const subject = "Reset Password";

	const HTMLtemplate = `
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="background-color: #ffffff; max-width: 600px; margin: 40px auto; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="text-align: center; padding-bottom: 20px;">
      <h1 style="margin: 0; color: #333;"> ${subject} </h1>
    </div>
    <div style="color: #555; line-height: 1.6;">
      <p>Hi ${user.firstName} ${user.lastName}</p>
      <p>You recently requested to reset your password. Click the button below to continue:</p>
      <p style="text-align: center;">
        <a href="${resetUrl}" target="_blank" style="display: inline-block; margin: 20px 0; padding: 12px 25px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      </p>
      <p>If you didn’t request a password reset, please ignore this email.</p>
      <p>Thank you,<br/>The Support Team</p>
    </div>
    <div style="margin-top: 30px; font-size: 12px; color: #aaa; text-align: center;">
      © 2025 Your Company. All rights reserved.
    </div>
  </div>
</body>
</html>
`;

	await sendEmail({ email: user.email, subject, html: HTMLtemplate });
};
