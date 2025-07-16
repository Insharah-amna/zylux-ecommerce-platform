const cloudinary = require("../utils/cloudinary");
const { asyncTryCatch } = require("../utils/tryCatchUtils");

const CloudinaryService = {
	uploadSingleFile: async ({ file, folder }) => {
		const { success, response, error } = await asyncTryCatch(() => {
			return new Promise((resolve, reject) => {
				const stream = cloudinary.uploader.upload_stream(
					{ folder },
					(error, result) => {
						if (error) return reject(error);
						resolve(result);
					}
				);
				stream.end(file.buffer);
			});
		});

		const url = response?.secure_url || null;
		return { success, url, error };
	},

	uploadMultipleFile: async ({ files, folder }) => {
		const {
			success,
			response: urls,
			error,
		} = await asyncTryCatch(async () => {
			const uploadFromBuffer = (file) => {
				return new Promise((resolve, reject) => {
					const stream = cloudinary.uploader.upload_stream(
						{ folder },
						(error, result) => {
							if (error) return reject(error);
							resolve(result);
						}
					);

					stream.end(file.buffer);
				});
			};

			const uploadPromises = files.map((file) => uploadFromBuffer(file));
			const urls = await Promise.all(uploadPromises);
			return urls;
		});

		// const {
		// 	success,
		// 	response: urls,
		// 	error,
		// } = await asyncTryCatch(async () => {
		// 	const uploadPromises = files.map((file) => {
		// 		console.log(file.path);
		// 		cloudinary.uploader.upload(file.path, {
		// 			folder,
		// 		});
		// 	});

		// 	const urls = await Promise.all(uploadPromises);
		// 	return urls;
		// });

		const finalUrls = urls.map((r) => r.secure_url);

		return { success, urls: finalUrls, error };
	},
};

module.exports = CloudinaryService;
