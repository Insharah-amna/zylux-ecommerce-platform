const ReviewResponses = {
	reviewAddedSuccessfully: ({ res, review }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Review added successfully",
			body: { review },
		});
	},

	reviewsFetchedSuccessfully: ({ res, reviews, page, limit, totalPages }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Reviews fetched successfully",
			body: { reviews, pagination: { page, limit, totalPages } },
		});
	},

	reviewRemovedSuccessfully: ({ res }) => {
		return res.status(200).json({
			statusCode: 200,
			message: "Review removed successfully",
		});
	},
};

module.exports = ReviewResponses;
