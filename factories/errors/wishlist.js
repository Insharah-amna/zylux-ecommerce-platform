const WishlistErrors = {
	productNotAddedToWishlist: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Product failed to add to wishlist",
		});
	},

	productAlreadyExists: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Product already added to wishlist",
		});
	},

	deletionFailedErr: ({ res }) => {
		return res.status(400).json({
			statusCode: 400,
			message: "Product failed to remove from wishlist",
		});
	},
};

module.exports = WishlistErrors;
