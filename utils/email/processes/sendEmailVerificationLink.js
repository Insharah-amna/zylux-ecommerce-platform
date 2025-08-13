const { generateFrontendUrl } = require("../../generalUtils");
const { generateToken } = require("../../jwtUtils");
const { sendEmail } = require("../send");

exports.sendEmailVerificationLink = async ({ userEmail }) => {
	const tokenPayload = {
		email: userEmail,
		password: undefined,
	};

	const { token } = generateToken({
		payLoad: tokenPayload,
		expiresIn: 15 * 60,
	});

	const emailVerifyUrl = generateFrontendUrl({
		path: "auth/verify-email",
		token,
	});

	const subject = "Email Verification";

	const HTMLtemplate = `
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>
  <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 10px;">
      <h2 style="text-align: center; color: #333;">Verify Your Email</h2>
      <p>Hello,</p>
      <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>

      <p style="text-align: center; margin: 30px 0;">
        <a href=${emailVerifyUrl}
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Verify Email
        </a>
      </p>

      <p>If you didn’t create an account, you can safely ignore this email.</p>

      <p>Thanks,<br />The Support Team</p>

      <hr style="margin-top: 40px;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
        © 2025 Your Company. All rights reserved.
      </p>
    </div>
  </body>
</html>
`;

	await sendEmail({ email: userEmail, subject, html: HTMLtemplate });
};
