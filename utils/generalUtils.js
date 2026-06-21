const frontendUrl = process.env.CLIENT_URL;

const generateFrontendUrl = ({ path, token }) => {
	return `${frontendUrl}/${path}/${token}`;
};

module.exports = { generateFrontendUrl };
