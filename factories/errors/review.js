const ReviewErrors = {
	failedToAddReviewErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to add review",
		});
	},

	reviewsNotFound: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "Reviews not found",
		});
	},

	reviewNotFound: ({ res }) => {
		return res.status(404).json({
			statusCode: 404,
			message: "Review not found",
		});
	},

	failedToDeleteReviewErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Failed to delete review",
		});
	},

	unauthorizedToDeleteReview: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "You are not authorized to delete this review",
		});
	},
};

module.exports = ReviewErrors;
