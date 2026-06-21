const multer = require("multer");

const createUploadMiddleware = ({ allowedTypes, fileSizeLimitMB = 10 }) => {
	const storage = multer.memoryStorage();

	const fileFilter = (req, file, cb) => {
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error("File type is not allowed"));
		}
	};

	return multer({
		storage,
		fileFilter,
		limits: {
			fileSize: fileSizeLimitMB * 1024 * 1024,
		},
	});
};

module.exports = createUploadMiddleware;
