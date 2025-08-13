const frontendUrl = process.env.FRONTEND_APP_URL;

const generateFrontendUrl = ({ path, token }) => {
	return `${frontendUrl}/${path}/${token}`;
};

module.exports = { generateFrontendUrl };
