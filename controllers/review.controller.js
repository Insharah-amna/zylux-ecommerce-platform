const ReviewModel = require("../model/review.model");
const GeneralServices = require("../services/general.service");
const ReviewResponses = require("../factories/responses/review");
const ReviewErrors = require("../factories/errors/review");
const { GetPaginationSkip, ROLES } = require("../constants/general");
const ProductsModel = require("../model/products.model");
const { calculateAverageRating } = require("../utils/calculateAverageRating");

const ReviewController = {
	addReview: async (req, res) => {
		let data = req.body;
		const userId = req.user._id;
		const { id: productId } = req.params;

		const { error, doc: review } = await GeneralServices.create({
			model: ReviewModel,
			data: { ...data, userId, productId },
		});

		if (error) return ReviewErrors.failedToAddReviewErr({ res });

		const { response: product } = await GeneralServices.findById({
			model: ProductsModel,
			id: productId,
		});

		const { newRating, oldCount } = calculateAverageRating({ product, data });

		const { error: productUpdateError, updatedDoc: updatedProduct } =
			await GeneralServices.findByIdAndUpdate({
				model: ProductsModel,
				id: productId,
				data: {
					$set: {
						averageRating: newRating,
						reviewCount: oldCount + 1,
					},
				},
			});

		if (productUpdateError || !updatedProduct) {
			await GeneralServices.findByIdAndDelete({
				model: ReviewModel,
				id: review._id,
			});

			return ReviewErrors.failedToAddReviewErr({ res });
		}

		return ReviewResponses.reviewAddedSuccessfully({ res, review });
	},

	fetchReviewsByProductId: async (req, res) => {
		const { productId } = req.params;

		const { page, limit } = req.query;

		const { skip } = GetPaginationSkip({ page, limit });

		const { count } = await GeneralServices.countDocuments({
			model: ReviewModel,
			query: { productId },
		});

		const { error, response: reviews } = await GeneralServices.find({
			model: ReviewModel,
			query: { productId },
			options: {
				populatedFields: ["userId", "productId"],
				queryProperties: {
					limit,
					skip,
					sort: { createdAt: -1 },
				},
			},
		});

		if (error) return ReviewErrors.reviewsNotFound({ res });

		return ReviewResponses.reviewsFetchedSuccessfully({
			res,
			reviews,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		});
	},

	fetchAllReviews: async (req, res) => {
		const { page, limit } = req.query;

		const { skip } = GetPaginationSkip({ page, limit });

		const { count } = await GeneralServices.countDocuments({
			model: ReviewModel,
		});

		const { error, response: reviews } = await GeneralServices.find({
			model: ReviewModel,
			options: {
				populatedFields: ["userId", "productId"],
				queryProperties: {
					limit,
					skip,
					sort: { createdAt: -1 },
				},
			},
		});

		if (error) return ReviewErrors.reviewsNotFound({ res });

		return ReviewResponses.reviewsFetchedSuccessfully({
			res,
			reviews,
			page,
			limit,
			totalPages: Math.ceil(count / limit),
		});
	},

	deleteReviews: async (req, res) => {
		const { id } = req.params;
		const user = req.user;

		const { error, response: reviewObj } = await GeneralServices.findById({
			model: ReviewModel,
			id,
			options: {
				populatedFields: ["userId"],
			},
		});

		if (error) return ReviewErrors.reviewNotFound({ res });

		if (
			user.role === ROLES.buyer.value &&
			user._id.toString() === reviewObj.userId._id.toString()
		) {
			const { error } = await GeneralServices.findByIdAndDelete({
				model: ReviewModel,
				id,
			});

			if (error) return ReviewErrors.failedToDeleteReviewErr({ res });

			return ReviewResponses.reviewRemovedSuccessfully({ res });
		} else if (user.role === ROLES.admin.value) {
			const { error } = await GeneralServices.findByIdAndDelete({
				model: ReviewModel,
				id,
			});

			if (error) return ReviewErrors.failedToDeleteReviewErr({ res });

			return ReviewResponses.reviewRemovedSuccessfully({ res });
		} else {
			return ReviewErrors.unauthorizedToDeleteReview({ res });
		}
	},
};

module.exports = ReviewController;
